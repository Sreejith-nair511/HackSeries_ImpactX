# Translation Process

This document outlines the process for managing translations in the ImpactX application.

## Overview

ImpactX supports multiple languages to ensure accessibility for users across India. The application uses JSON files for managing translations.

## Translation Files Structure

Translations are stored in `frontend/src/locales` with the following structure:

```
locales/
├── en/
│   └── translation.json
├── hi/
│   └── translation.json
├── ta/
│   └── translation.json
└── ...
```

## Adding New Translations

1. Create a new directory with the appropriate language code
2. Copy an existing translation.json file as a template
3. Translate all strings while maintaining the JSON structure
4. Add the new language to the i18n configuration

## Maintaining Translations

### When Adding New Features

1. Add new strings to the English translation file first
2. Add the same keys to all other translation files with a "TRANSLATE" placeholder
3. Notify translators to update their respective files

### Quality Assurance

- Ensure all translation files have the same keys
- Validate JSON syntax
- Test the application with each language

## Best Practices

1. Keep translations consistent with the context
2. Maintain cultural sensitivity
3. Use gender-neutral language where possible
4. Follow the established naming conventions
5. Keep translations concise but clear

## Tools

- Use a JSON validator to ensure files are properly formatted
- Use translation management tools when available
- Regularly audit translation files for completeness

## Validation Script

Run the validation script to check for missing or extra keys across translation files:

```bash
npm run validate-translations
```

This will report any discrepancies between the English reference file and other language files.