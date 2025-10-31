# Locales Structure Documentation

This document describes the structure and organization of the internationalization (i18n) locale files in the ImpactX project.

## Overview

The locale files are organized in the `frontend/src/locales` directory, with each supported language having its own subdirectory containing a `translation.json` file.

## Directory Structure

```
frontend/src/locales/
├── README.md
├── bn/              # Bengali translations
│   └── translation.json
├── en/              # English translations (reference)
│   └── translation.json
├── gu/              # Gujarati translations
│   └── translation.json
├── hi/              # Hindi translations
│   └── translation.json
├── mr/              # Marathi translations
│   └── translation.json
├── ta/              # Tamil translations
│   └── translation.json
└── te/              # Telugu translations
    └── translation.json
```

## File Format

Each `translation.json` file follows a hierarchical key-value structure organized by feature sections:

- `common`: Shared UI elements and general terms
- `navigation`: Menu items and navigation labels
- `dashboard`: Dashboard-specific content
- `alerts`: Emergency alert system terminology
- `resources`: Resource management terms
- `communityReporting`: Community reporting features
- `disasterCommunicationHub`: Communication channels and protocols

## Language Codes

| Code | Language |
|------|----------|
| bn   | Bengali  |
| en   | English  |
| gu   | Gujarati |
| hi   | Hindi    |
| mr   | Marathi  |
| ta   | Tamil    |
| te   | Telugu   |

## Maintenance

To add a new language:
1. Create a new directory with the appropriate language code
2. Copy the English `translation.json` as a template
3. Translate all values while preserving the key structure
4. Validate the JSON structure using the validation script

To update existing translations:
1. Ensure key consistency with the English reference file
2. Run the translation validation script to identify missing or extra keys
3. Update the translation files accordingly