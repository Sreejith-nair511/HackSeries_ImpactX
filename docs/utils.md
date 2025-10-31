# Utility Functions Documentation

This document explains the utility functions available in the ImpactX project.

## Translation Helper Functions

File: `frontend/src/utils/translationHelper.js`

### flattenObject(obj, prefix)

Flattens a nested object into a single level object with dot notation keys.

**Parameters:**
- `obj` (Object): The object to flatten
- `prefix` (string): The prefix to use for keys (optional)

**Returns:**
- Object: The flattened object

**Example:**
```javascript
const nested = { a: { b: { c: 1 } } };
const flat = flattenObject(nested);
// Result: { 'a.b.c': 1 }
```

### getTranslationKeys(translationObj)

Gets all keys from a translation object.

**Parameters:**
- `translationObj` (Object): The translation object

**Returns:**
- Array: Array of all keys

### findMissingKeys(reference, translation)

Finds missing keys in a translation object compared to a reference.

**Parameters:**
- `reference` (Object): The reference translation object
- `translation` (Object): The translation object to check

**Returns:**
- Array: Array of missing keys

### findExtraKeys(reference, translation)

Finds extra keys in a translation object compared to a reference.

**Parameters:**
- `reference` (Object): The reference translation object
- `translation` (Object): The translation object to check

**Returns:**
- Array: Array of extra keys

### validateTranslation(reference, translation)

Validates a translation object against a reference.

**Parameters:**
- `reference` (Object): The reference translation object
- `translation` (Object): The translation object to validate

**Returns:**
- Object: Validation results with isValid, missingKeys, and extraKeys properties

## Using Utility Functions

To use these functions in your components:

```javascript
import { validateTranslation } from '../utils/translationHelper';

// In a component or function
const validationResult = validateTranslation(englishTranslations, hindiTranslations);
if (!validationResult.isValid) {
  console.log('Missing keys:', validationResult.missingKeys);
}
```

## Adding New Utility Functions

To add a new utility function:

1. Create or update the appropriate file in `frontend/src/utils/`
2. Export the function
3. Write tests for the function
4. Document the function in this file
5. Use the function in your components