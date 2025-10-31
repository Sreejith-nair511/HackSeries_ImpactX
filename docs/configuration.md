# Configuration Documentation

This document explains the configuration files and settings used in the ImpactX project.

## Translation Configuration

File: `config/translation.config.js`

### SUPPORTED_LANGUAGES

An array of supported languages with their codes and names.

**Structure:**
```javascript
[
  { 
    code: 'en',        // Language code (ISO 639-1)
    name: 'English',   // English name of the language
    localName: 'English' // Name of the language in its own script
  }
]
```

### DEFAULT_LANGUAGE

The default language code to use when no language is specified.

### FALLBACK_LANGUAGE

The fallback language code to use when a translation is missing in the current language.

### LOCALES_PATH

The path to the locales directory relative to the project root.

### VALIDATION_SETTINGS

Settings for translation validation:

- `checkMissingKeys`: Whether to check for missing keys during validation
- `checkExtraKeys`: Whether to check for extra keys during validation
- `maxMissingKeysToReport`: Maximum number of missing keys to report
- `maxExtraKeysToReport`: Maximum number of extra keys to report

## Using Configuration Settings

To use these settings in your code:

```javascript
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../config/translation.config';

// Use the settings
const defaultLang = DEFAULT_LANGUAGE;
const languages = SUPPORTED_LANGUAGES.map(lang => lang.code);
```

## Adding New Configuration

To add new configuration settings:

1. Create or update the appropriate file in the `config/` directory
2. Export the new settings
3. Document the settings in this file
4. Use the settings in your code

## Best Practices

1. Keep configuration files organized by feature or module
2. Use clear, descriptive names for configuration settings
3. Provide sensible default values
4. Document all configuration settings
5. Validate configuration values where appropriate