# Commit Strategy

This document outlines the strategy for creating meaningful commits in the ImpactX project.

## Purpose

The purpose of this strategy is to:

1. Maintain a clean, readable git history
2. Enable easy navigation and understanding of changes
3. Support automated release processes
4. Facilitate collaboration among team members
5. Ensure traceability of changes to issues and features

## Commit Principles

### 1. Small, Focused Commits

- Each commit should represent a single logical change
- Keep commits small and manageable
- Avoid combining unrelated changes in a single commit

### 2. Clear, Descriptive Messages

- Use the imperative mood ("Add feature" not "Added feature")
- Be specific about what changed and why
- Keep the first line under 72 characters
- Use the body to explain the "why" not the "what"

### 3. Consistent Formatting

- Follow the conventional commit format
- Use consistent casing and punctuation
- Include relevant issue numbers when applicable

## Commit Types

### feat

Use for new features or enhancements:

```
feat(auth): add multi-factor authentication

Implement TOTP-based multi-factor authentication
for enhanced account security.

Closes #456
```

### fix

Use for bug fixes:

```
fix(dashboard): resolve chart rendering issue

Fix issue where charts were not displaying
correctly on Firefox browsers.

Fixes #789
```

### docs

Use for documentation changes:

```
docs(readme): update installation instructions

Clarify installation steps for Windows users
and add troubleshooting tips.

Related to #123
```

### style

Use for code style changes:

```
style(components): format code according to eslint rules

Apply consistent formatting across all React components
using prettier configuration.
```

### refactor

Use for code refactoring:

```
refactor(api): simplify user service methods

Consolidate duplicate code in user service and
improve method naming consistency.
```

### test

Use for adding or modifying tests:

```
test(auth): add unit tests for login validation

Add comprehensive test coverage for login
validation edge cases.
```

### chore

Use for maintenance tasks:

```
chore(deps): update react dependencies

Update react and react-dom to latest stable versions.
```

## Branch Naming Convention

Use descriptive branch names that follow this pattern:

```
<type>/<brief-description>
```

Examples:
- `feat/user-profile`
- `fix/login-bug`
- `docs/api-guide`
- `refactor/database-connection`

## Merge Strategy

### Feature Branches

1. Create a feature branch from `develop`
2. Make commits following the strategy outlined above
3. Create a pull request to `develop`
4. Request code review
5. Merge after approval and passing CI checks

### Hotfixes

1. Create a hotfix branch from `main`
2. Make the necessary fixes
3. Create a pull request to `main`
4. Request urgent review
5. Merge after approval
6. Merge changes back to `develop`

## Tagging and Releases

### Version Tags

Use semantic versioning for tags:

- `v1.0.0` for major releases
- `v1.1.0` for minor releases
- `v1.0.1` for patch releases

### Release Notes

Generate release notes from commit history:

1. Group commits by type
2. Highlight breaking changes
3. Include contributor acknowledgments
4. Provide upgrade instructions when necessary

## Best Practices

### 1. Commit Early and Often

- Don't wait until a feature is complete to commit
- Commit working changes frequently
- Use `git add -p` to stage partial changes

### 2. Write Meaningful Commit Messages

- Spend time crafting good commit messages
- Think about future developers (including yourself)
- Include context about why a change was made

### 3. Use Git Hooks

- Implement pre-commit hooks for code formatting
- Use commit-msg hooks to validate message format
- Set up pre-push hooks for final checks

### 4. Review Before Pushing

- Use `git log --oneline` to review recent commits
- Check for any sensitive information
- Ensure commit messages are clear and accurate

## Tools and Automation

### Commitlint

Use commitlint to enforce commit message conventions:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### Husky

Use Husky to set up Git hooks:

```bash
npm install --save-dev husky
```

### Commitizen

Use Commitizen for interactive commit messages:

```bash
npm install --save-dev commitizen cz-conventional-changelog
```

## Common Mistakes to Avoid

1. **Vague commit messages** like "fix bug" or "update code"
2. **Large commits** that change too many things at once
3. **Inconsistent formatting** in commit messages
4. **Including sensitive information** in commits
5. **Committing generated files** or build artifacts
6. **Mixing unrelated changes** in a single commit

## Recovery Strategies

### Amending Commits

To fix the last commit:

```bash
git commit --amend -m "Corrected commit message"
```

### Interactive Rebase

To modify multiple recent commits:

```bash
git rebase -i HEAD~3
```

### Resetting Commits

To undo commits while keeping changes:

```bash
git reset --soft HEAD~1
```

## Conclusion

Following this commit strategy will help maintain a clean, informative git history that serves as documentation for the project. It enables better collaboration, easier debugging, and more reliable release processes.

Remember that good commits tell a story of how the project evolved over time. Each commit should represent a logical step forward that makes sense to other developers and your future self.