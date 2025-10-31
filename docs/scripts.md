# Scripts Documentation

This document explains the various scripts available in the ImpactX project.

## Translation Scripts

### validate-translations

Validates all translation files to ensure they have the same keys as the reference English file.

```bash
npm run validate-translations
```

This script:
1. Reads all translation files from the locales directory
2. Compares each file against the English reference file
3. Reports any missing or extra keys
4. Validates JSON syntax

### test-translations

Runs a test of the translation validation script and displays the output.

```bash
npm run test-translations
```

### translation-status

Generates a report of the translation status for all supported languages.

```bash
npm run translation-status
```

### count-commits

Counts and displays statistics about commits in the repository.

```bash
npm run count-commits
```

### file-report

Generates a report of all files in the project, including size and extension statistics.

```bash
npm run file-report
```

### find-todos

Searches for TODO, FIXME, and other comment markers in the codebase.

```bash
npm run find-todos
```

## Adding New Scripts

To add a new script:

1. Create the script file in the `scripts/` directory
2. Add the script to the `scripts` section in `package.json`
3. Document the script in this file

## Best Practices

1. All scripts should be written in JavaScript or Node.js for consistency
2. Scripts should be well-documented with comments
3. Error handling should be implemented where appropriate
4. Scripts should provide clear output messages
5. Cross-platform compatibility should be considered