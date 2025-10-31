# Scripts Directory

This directory contains utility scripts for development and maintenance of the ImpactX project.

## Available Scripts

### validate-translations.js

Validates all translation files to ensure they have the same keys as the reference English file.

```bash
npm run validate-translations
```

### test-translations.js

Runs a test of the translation validation script and displays the output.

```bash
npm run test-translations
```

### translation-status.js

Generates a report of the translation status for all supported languages.

```bash
npm run translation-status
```

### count-commits.js

Counts and displays statistics about commits in the repository.

```bash
npm run count-commits
```

### file-report.js

Generates a report of all files in the project, including size and extension statistics.

```bash
npm run file-report
```

### find-todos.js

Searches for TODO, FIXME, and other comment markers in the codebase.

```bash
npm run find-todos
```

## Adding New Scripts

To add a new script:

1. Create the script file in this directory
2. Add the script to the `scripts` section in the root `package.json`
3. Document the script in `docs/scripts.md`
4. Test the script to ensure it works correctly

## Best Practices

1. All scripts should be written in JavaScript or Node.js for consistency
2. Scripts should be well-documented with comments
3. Error handling should be implemented where appropriate
4. Scripts should provide clear output messages
5. Cross-platform compatibility should be considered
6. Scripts should be added to the package.json scripts section
7. Scripts should be documented in the docs/scripts.md file