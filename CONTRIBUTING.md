# Contributing to AI Docu-Flow

Thank you for your interest in contributing to AI Docu-Flow! We welcome contributions from the community and are grateful for your support.

## 🌟 How to Contribute

There are many ways to contribute to this project:

- 🐛 Report bugs and issues
- 💡 Suggest new features or enhancements
- 📝 Improve documentation
- 🔧 Submit bug fixes
- ✨ Add new features
- 🎨 Improve UI/UX
- 🧪 Write tests

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone <your-fork-url>
   cd flowdocs
   ```
3. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Commit your changes** with clear commit messages
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** against the main repository

## 📋 Pull Request Guidelines

### Before Submitting

- ✅ Ensure your code follows the existing code style
- ✅ Update documentation for any changed functionality
- ✅ Add tests for new features
- ✅ Make sure all tests pass
- ✅ Update the README.md if needed
- ✅ Keep PRs focused on a single concern

### PR Description

Please include:

- **Purpose**: What problem does this solve?
- **Changes**: Brief description of what changed
- **Testing**: How did you test your changes?
- **Screenshots**: If UI changes, include before/after images
- **Breaking Changes**: Note any breaking changes

## 🐛 Reporting Bugs

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, Node.js version, browser, etc.
- **Logs**: Relevant error messages or logs
- **Screenshots**: If applicable

## 💡 Suggesting Features

We love new ideas! When suggesting features:

- **Use Case**: Describe the problem you're trying to solve
- **Proposed Solution**: Your suggested implementation
- **Alternatives**: Other solutions you've considered
- **Impact**: Who would benefit from this feature?

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. Install dependencies for all services:
   ```bash
   cd strapi && npm install
   cd ../docusaurus && npm install
   cd ../mcp-server && npm install
   ```

2. Start services for development:
   ```bash
   ./start-all.sh
   ```

3. Access the services:
   - Strapi: http://localhost:1337
   - Docusaurus: http://localhost:3000

## 📝 Code Style

- Use meaningful variable and function names
- Comment complex logic
- Follow the existing code structure
- Use TypeScript where applicable
- Format code consistently (we recommend Prettier)

### JavaScript/TypeScript

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use async/await over promises when possible
- Handle errors appropriately

### Commits

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(mcp): add support for bulk article import
fix(docusaurus): resolve sync timing issue
docs(readme): update installation instructions
```

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Test manually in your local environment
- Consider edge cases

### Running Tests

```bash
# Run tests for specific service
cd strapi && npm test
cd docusaurus && npm test
cd mcp-server && npm test
```

## 📚 Documentation

Good documentation helps everyone:

- Update README.md for user-facing changes
- Add inline comments for complex code
- Update API documentation
- Include examples where helpful

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to:

- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Project maintainers are responsible for clarifying standards and taking appropriate corrective action. Instances of unacceptable behavior may be reported by contacting the project team.

## 🎯 Areas We Need Help

Current priorities:

- 🐳 Docker containerization
- 📦 CI/CD pipeline setup
- 🧪 Test coverage improvement
- 🌐 Internationalization (i18n)
- 📖 More documentation and examples
- 🔌 Additional MCP tool implementations
- 🎨 UI/UX enhancements

## ❓ Questions?

Feel free to:

- Open an issue for questions
- Start a discussion on GitHub Discussions
- Check existing issues and discussions first

## 🙏 Recognition

All contributors will be recognized in our README and release notes. Thank you for making AI Docu-Flow better!

---

**Thank you for contributing! Together we can build something amazing.** ✨
