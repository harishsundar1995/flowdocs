# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Docker containerization for easy deployment
- CI/CD pipeline templates
- Webhook-based sync (replacing polling)
- Multi-language support (i18n)
- Rich text editor integration
- Content versioning system
- Multi-provider LLM support (OpenAI, Google, etc.)

## [1.0.0] - 2025-11-02

### Added
- Initial release of FlowDocs
- Complete documentation system with Strapi CMS backend
- Model Context Protocol (MCP) server for Claude Desktop integration
- Docusaurus-based documentation site with real-time sync
- 6 MCP tools for documentation management:
  - `create_documentation_page` - Create new articles
  - `list_documentation_pages` - List and filter articles
  - `update_documentation_page` - Update existing articles
  - `get_documentation_page` - Fetch articles by ID or slug
  - `delete_documentation_page` - Delete articles
  - `search_documentation` - Full-text search across content
- Hot-reload content watcher with 10-second polling
- Unified startup script for all services
- Comprehensive README with setup instructions
- MIT License for open-source distribution
- Contributing guidelines
- Code of Conduct
- Security policy
- LinkedIn launch post templates

### Technical Details
- Strapi v5.24.2 with custom Article content type
- Docusaurus v3.9.1 with TypeScript support
- MCP Server using @modelcontextprotocol/sdk v1.18.2
- Node.js 18+ support
- Better-sqlite3 for database
- Axios for API communication
- Zod for schema validation

### Documentation
- Complete setup guide
- Architecture documentation
- Troubleshooting section
- API usage examples
- Claude Desktop configuration guide

---

## Release Notes Format

Each release will include:

### Added
New features and capabilities

### Changed
Changes to existing functionality

### Deprecated
Features that will be removed in future versions

### Removed
Features that have been removed

### Fixed
Bug fixes

### Security
Security vulnerability patches

---

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub!

Want to contribute? Check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Note**: This changelog will be updated with each release. For unreleased changes, check the [main branch](https://github.com/your-repo/flowdocs).
