#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Testing translation validation script...');

try {
  // Run the validation script
  const output = execSync('node scripts/validate-translations.js', { encoding: 'utf8' });
  console.log('Validation output:');
  console.log(output);
} catch (error) {
  console.log('Validation completed with issues (this is expected if there are missing translations):');
  console.log(error.stdout);
  console.log(error.stderr);
}

console.log('Test completed.');