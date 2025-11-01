# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently, we support the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of AI Docu-Flow seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisories** - Use the "Report a vulnerability" option in the Security tab
2. **Email** - Send details to the repository maintainers

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt of your vulnerability report within 48 hours
- **Updates**: We'll send you regular updates about our progress
- **Fix Timeline**: We aim to patch critical vulnerabilities within 7 days
- **Credit**: We'll publicly credit you for responsibly disclosing the issue (unless you prefer to remain anonymous)

## Security Best Practices

When deploying AI Docu-Flow:

### API Tokens
- Never commit `.env` files to version control
- Use strong, randomly generated API tokens
- Rotate tokens regularly
- Limit token permissions to only what's needed

### Strapi Security
- Change default admin credentials immediately
- Keep Strapi updated to the latest version
- Configure proper CORS settings
- Use HTTPS in production
- Implement rate limiting

### MCP Server
- Run with minimal required permissions
- Validate all input from the LLM
- Implement proper error handling
- Don't expose internal errors to the client

### Docusaurus
- Keep dependencies updated
- Review and sanitize user-generated content
- Implement proper CSP headers in production

### Network Security
- Use firewalls to restrict access
- Implement proper authentication
- Use secure communication protocols (HTTPS/WSS)
- Don't expose services unnecessarily

## Known Security Considerations

### API Token Storage
The MCP server requires a Strapi API token. Store this securely:
- Use environment variables (never hardcode)
- Don't commit to version control
- Use secrets management in production

### Content Validation
AI-generated content is not validated for malicious code. Always:
- Review AI-generated content before publishing
- Implement content security policies
- Sanitize user inputs

### Access Control
By default, Strapi's public API allows read access. Consider:
- Implementing authentication for sensitive content
- Using role-based access control (RBAC)
- Auditing access logs regularly

## Updates and Patches

- Security patches will be released as soon as possible
- Subscribe to GitHub releases for notifications
- Review the CHANGELOG for security-related updates
- Keep all dependencies up to date

## Security Scanning

We recommend:
- Regular dependency audits: `npm audit`
- Code scanning with GitHub's security features
- Regular security assessments
- Monitoring security advisories for dependencies

Thank you for helping keep AI Docu-Flow and its users safe!
