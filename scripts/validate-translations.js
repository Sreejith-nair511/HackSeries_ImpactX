#!/usr/bin/env node

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

// Function to validate translation files
function validateTranslations(translationFiles) {
  const referenceLang = 'en';
  const referenceFile = translationFiles[referenceLang];
  
  if (!referenceFile) {
    console.error('Reference language (en) translation file not found');
    process.exit(1);
  }
  
  const referenceData = JSON.parse(fs.readFileSync(referenceFile, 'utf8'));
  const referenceKeys = getAllKeys(referenceData);
  
  console.log(`Reference language (${referenceLang}) has ${referenceKeys.length} keys`);
  
  let hasErrors = false;
  
  for (const lang in translationFiles) {
    if (lang === referenceLang) continue;
    
    const file = translationFiles[lang];
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const keys = getAllKeys(data);
      
      // Check for missing keys
      const missingKeys = referenceKeys.filter(key => !keys.includes(key));
      // Check for extra keys
      const extraKeys = keys.filter(key => !referenceKeys.includes(key));
      
      if (missingKeys.length > 0 || extraKeys.length > 0) {
        hasErrors = true;
        console.log(`\n${lang} translation issues:`);
        if (missingKeys.length > 0) {
          console.log(`  Missing keys (${missingKeys.length}):`);
          missingKeys.slice(0, 10).forEach(key => console.log(`    - ${key}`));
          if (missingKeys.length > 10) {
            console.log(`    ... and ${missingKeys.length - 10} more`);
          }
        }
        if (extraKeys.length > 0) {
          console.log(`  Extra keys (${extraKeys.length}):`);
          extraKeys.slice(0, 10).forEach(key => console.log(`    - ${key}`));
          if (extraKeys.length > 10) {
            console.log(`    ... and ${extraKeys.length - 10} more`);
          }
        }
      } else {
        console.log(`${lang} translation is complete (${keys.length} keys)`);
      }
    } catch (error) {
      hasErrors = true;
      console.log(`${lang} translation file has JSON errors: ${error.message}`);
    }
  }
  
  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('\nAll translation files are valid!');
  }
}

// Main execution
const localesDir = path.join(__dirname, '..', 'frontend', 'src', 'locales');

if (!fs.existsSync(localesDir)) {
  console.error('Locales directory not found');
  process.exit(1);
}

const translationFiles = getTranslationFiles(localesDir);
validateTranslations(translationFiles);