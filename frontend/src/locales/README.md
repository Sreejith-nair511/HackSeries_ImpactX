# Locales

This directory contains translation files for the ImpactX application in multiple languages.

## Supported Languages

- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Marathi (mr)
- Bengali (bn)
- Gujarati (gu)

## File Structure

Each language has its own directory with a `translation.json` file containing all the translated strings for that language.

## Adding New Languages

To add a new language:

1. Create a new directory with the language code (e.g., `fr` for French)
2. Copy the structure from an existing translation file
3. Translate all the strings
4. Add the language to the language selector in the application

## Maintaining Translations

When adding new features or modifying existing text in the application:

1. Update the English translation file first
2. Sync the changes to all other language files
3. Mark untranslated strings clearly so translators can identify them

## Validation

All JSON files are validated automatically during the build process. Make sure all translation files are valid JSON before committing.