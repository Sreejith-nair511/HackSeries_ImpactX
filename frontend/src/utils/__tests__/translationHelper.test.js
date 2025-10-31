/**
 * Test file for translationHelper.js
 */

import {
  flattenObject,
  getTranslationKeys,
  findMissingKeys,
  findExtraKeys,
  validateTranslation
} from '../translationHelper';

describe('Translation Helper Functions', () => {
  const mockTranslation = {
    common: {
      app_name: 'ImpactX',
      home: 'Home',
      donate: 'Donate'
    },
    home: {
      title: 'Disaster Relief Funding',
      hero: {
        title: 'Flood Relief',
        description: 'Help families affected by floods'
      }
    }
  };

  const mockIncompleteTranslation = {
    common: {
      app_name: 'ImpactX',
      home: 'Home'
      // Missing 'donate' key
    },
    home: {
      title: 'Disaster Relief Funding'
      // Missing hero section
    }
  };

  const mockExtraTranslation = {
    common: {
      app_name: 'ImpactX',
      home: 'Home',
      donate: 'Donate',
      extra: 'Extra Key'
    },
    home: {
      title: 'Disaster Relief Funding',
      hero: {
        title: 'Flood Relief',
        description: 'Help families affected by floods'
      }
    },
    extra: {
      section: 'Extra Section'
    }
  };

  test('flattenObject should flatten nested objects', () => {
    const flattened = flattenObject(mockTranslation);
    
    expect(flattened).toEqual({
      'common.app_name': 'ImpactX',
      'common.home': 'Home',
      'common.donate': 'Donate',
      'home.title': 'Disaster Relief Funding',
      'home.hero.title': 'Flood Relief',
      'home.hero.description': 'Help families affected by floods'
    });
  });

  test('getTranslationKeys should return all keys', () => {
    const keys = getTranslationKeys(mockTranslation);
    
    expect(keys).toEqual([
      'common.app_name',
      'common.home',
      'common.donate',
      'home.title',
      'home.hero.title',
      'home.hero.description'
    ]);
  });

  test('findMissingKeys should identify missing keys', () => {
    const missing = findMissingKeys(mockTranslation, mockIncompleteTranslation);
    
    expect(missing).toEqual([
      'common.donate',
      'home.hero.title',
      'home.hero.description'
    ]);
  });

  test('findExtraKeys should identify extra keys', () => {
    const extra = findExtraKeys(mockTranslation, mockExtraTranslation);
    
    expect(extra).toEqual([
      'common.extra',
      'extra.section'
    ]);
  });

  test('validateTranslation should return validation results', () => {
    const validResult = validateTranslation(mockTranslation, mockTranslation);
    const invalidResult = validateTranslation(mockTranslation, mockIncompleteTranslation);
    const extraResult = validateTranslation(mockTranslation, mockExtraTranslation);
    
    expect(validResult).toEqual({
      isValid: true,
      missingKeys: [],
      extraKeys: []
    });
    
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.missingKeys.length).toBeGreaterThan(0);
    
    expect(extraResult.isValid).toBe(false);
    expect(extraResult.extraKeys.length).toBeGreaterThan(0);
  });
});