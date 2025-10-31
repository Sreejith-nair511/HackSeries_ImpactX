#!/usr/bin/env node

/**
 * TODO Finder Script
 * 
 * This script searches for TODO comments in the codebase.
 */

const fs = require('fs');
const path = require('path');

// Function to walk through directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (file !== 'node_modules' && file !== '.git') {
        walkDir(filePath, callback);
      }
    } else {
      callback(filePath, stat);
    }
  });
}

// Function to find TODO comments
function findTodos(rootDir) {
  const todos = [];
  const todoRegex = /(TODO|FIXME|NOTE|WARNING|HACK):\s*(.*)/i;
  
  walkDir(rootDir, (filePath, stat) => {
    // Skip non-text files
    const ext = path.extname(filePath).toLowerCase();
    const textExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.txt', '.css', '.html', '.yml', '.yaml'];
    
    if (!textExtensions.includes(ext)) {
      return;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        const match = line.match(todoRegex);
        if (match) {
          todos.push({
            file: filePath.replace(rootDir + path.sep, ''),
            line: index + 1,
            type: match[1].toUpperCase(),
            comment: match[2].trim()
          });
        }
      });
    } catch (error) {
      // Skip files that can't be read as text
      return;
    }
  });
  
  return todos;
}

// Function to generate TODO report
function generateTodoReport(todos) {
  console.log('# TODO Report\n');
  
  if (todos.length === 0) {
    console.log('No TODO comments found in the codebase.\n');
    return;
  }
  
  console.log(`Found ${todos.length} TODO comments:\n`);
  
  // Group by type
  const byType = {};
  todos.forEach(todo => {
    if (!byType[todo.type]) {
      byType[todo.type] = [];
    }
    byType[todo.type].push(todo);
  });
  
  // Display by type
  Object.entries(byType).forEach(([type, items]) => {
    console.log(`## ${type} (${items.length})\n`);
    
    items.forEach(todo => {
      console.log(`- ${todo.file}:${todo.line} - ${todo.comment}`);
    });
    
    console.log('');
  });
  
  console.log('## Summary\n');
  console.log('| Type | Count |');
  console.log('|------|-------|');
  
  Object.entries(byType).forEach(([type, items]) => {
    console.log(`| ${type} | ${items.length} |`);
  });
}

// Main execution
const rootDir = path.join(__dirname, '..');

if (!fs.existsSync(rootDir)) {
  console.error('Root directory not found');
  process.exit(1);
}

const todos = findTodos(rootDir);
generateTodoReport(todos);