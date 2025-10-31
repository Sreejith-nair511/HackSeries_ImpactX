#!/usr/bin/env node

/**
 * File Report Generator
 * 
 * This script generates a report of all files in the project.
 */

const fs = require('fs');
const path = require('path');

// Function to walk through directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath, stat);
    }
  });
}

// Function to get file extension
function getFileExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext || 'no-extension';
}

// Function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to generate file report
function generateFileReport(rootDir) {
  const files = [];
  const extensions = {};
  let totalSize = 0;
  
  walkDir(rootDir, (filePath, stat) => {
    // Skip node_modules and .git directories
    if (filePath.includes('node_modules') || filePath.includes('.git')) {
      return;
    }
    
    const ext = getFileExtension(filePath);
    const size = stat.size;
    
    files.push({
      path: filePath.replace(rootDir + path.sep, ''),
      size: size,
      extension: ext
    });
    
    // Count file extensions
    if (extensions[ext]) {
      extensions[ext].count++;
      extensions[ext].size += size;
    } else {
      extensions[ext] = {
        count: 1,
        size: size
      };
    }
    
    totalSize += size;
  });
  
  // Sort files by size (largest first)
  files.sort((a, b) => b.size - a.size);
  
  // Sort extensions by count (most frequent first)
  const sortedExtensions = Object.entries(extensions)
    .sort((a, b) => b[1].count - a[1].count);
  
  console.log('# File Report\n');
  console.log(`## Total Files: ${files.length}`);
  console.log(`## Total Size: ${formatFileSize(totalSize)}\n`);
  
  console.log('## File Extensions:\n');
  console.log('| Extension | Count | Total Size |');
  console.log('|-----------|-------|------------|');
  
  sortedExtensions.forEach(([ext, data]) => {
    console.log(`| ${ext || '(no extension)'} | ${data.count} | ${formatFileSize(data.size)} |`);
  });
  
  console.log('\n## Largest Files:\n');
  console.log('| File Path | Size |');
  console.log('|-----------|------|');
  
  // Show top 20 largest files
  files.slice(0, 20).forEach(file => {
    console.log(`| ${file.path} | ${formatFileSize(file.size)} |`);
  });
  
  console.log('\n## Notes:\n');
  console.log('- node_modules and .git directories are excluded from this report');
  console.log('- Files are sorted by size (largest first)');
  console.log('- Extensions are sorted by count (most frequent first)');
}

// Main execution
const rootDir = path.join(__dirname, '..');

if (!fs.existsSync(rootDir)) {
  console.error('Root directory not found');
  process.exit(1);
}

generateFileReport(rootDir);