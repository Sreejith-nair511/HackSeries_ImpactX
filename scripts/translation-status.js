#!/usr/bin/env node

/**
 * Translation Status Report Generator
 * 
 * This script generates a report of the translation status for all supported languages.
 */

const fs = require('fs');
const path = require('path');

// Function to get all translation files
function getTranslationFiles(localesDir) {
  const languages = fs.readdirSync(localesDir);
  const translationFiles = {};
  
  languages.forEach(lang => {
    const langDir = path.join(localesDir, lang);
    if (fs.statSync(langDir).isDirectory()) {
      const translationFile = path.join(langDir, 'translation.json');
      if (fs.existsSync(translationFile)) {
        translationFiles[lang] = translationFile;
      }
    }
  });
  
  return translationFiles;
}

// Function to get all keys from a nested object
function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Function to generate translation status report
function generateTranslationStatusReport(translationFiles) {
  const referenceLang = 'en';
  const referenceFile = translationFiles[referenceLang];
  
  if (!referenceFile) {
    console.error('Reference language (en) translation file not found');
    process.exit(1);
  }
  
  const referenceData = JSON.parse(fs.readFileSync(referenceFile, 'utf8'));
  const referenceKeys = getAllKeys(referenceData);
  const totalKeys = referenceKeys.length;
  
  console.log('# Translation Status Report\n');
  console.log(`Reference language (${referenceLang}) has ${totalKeys} keys\n`);
  
  // Table header
  console.log('| Language | Code | Status | Translated Keys | Completion |');
  console.log('|----------|------|--------|----------------|------------|');
  
  for (const lang in translationFiles) {
    if (lang === referenceLang) {
      console.log(`| English | ${lang} | Complete | ${totalKeys}/${totalKeys} | 100% |`);
      continue;
    }
    
    const file = translationFiles[lang];
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const keys = getAllKeys(data);
      
      // Check for missing keys
      const missingKeys = referenceKeys.filter(key => !keys.includes(key));
      const translatedKeys = keys.length - missingKeys.length;
      const completionPercentage = Math.round((translatedKeys / totalKeys) * 100);
      
      // Determine status
      let status = 'Complete';
      if (missingKeys.length > 0) {
        status = missingKeys.length < 10 ? 'Nearly Complete' : 'In Progress';
      }
      
      console.log(`| ${data.common.language} | ${lang} | ${status} | ${translatedKeys}/${totalKeys} | ${completionPercentage}% |`);
    } catch (error) {
      console.log(`| Unknown | ${lang} | Error | 0/${totalKeys} | 0% |`);
    }
  }
  
  console.log('\n## Notes\n');
  console.log('- Completion percentage is based on the number of translated keys compared to the reference language');
  console.log('- Status is determined by the number of missing keys');
  console.log('- Error status indicates JSON parsing issues in the translation file');
}

// Main execution
const localesDir = path.join(__dirname, '..', 'frontend', 'src', 'locales');

if (!fs.existsSync(localesDir)) {
  console.error('Locales directory not found');
  process.exit(1);
}

const translationFiles = getTranslationFiles(localesDir);
generateTranslationStatusReport(translationFiles);