#!/usr/bin/env node

/**
 * Commit Counter Script
 * 
 * This script counts the number of commits in the repository.
 */

const { execSync } = require('child_process');

try {
  // Count total commits
  const totalCommits = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
  
  // Count commits by author
  const commitsByAuthor = execSync('git shortlog -sn', { encoding: 'utf8' }).trim();
  
  // Count commits in the last week
  const recentCommits = execSync('git rev-list --count HEAD --since="1 week ago"', { encoding: 'utf8' }).trim();
  
  console.log('# Commit Statistics\n');
  console.log(`## Total Commits: ${totalCommits}\n`);
  console.log(`## Commits in the Last Week: ${recentCommits}\n`);
  console.log('## Commits by Author:\n');
  console.log('```\n' + commitsByAuthor + '\n```\n');
  
} catch (error) {
  console.error('Error counting commits:', error.message);
  process.exit(1);
}