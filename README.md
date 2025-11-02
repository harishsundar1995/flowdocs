[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/harishsundar1995-flowdocs-badge.png)](https://mseep.ai/app/harishsundar1995-flowdocs)


# FlowDocs: LLM-Powered Documentation System

> **Transform natural language conversations into beautifully formatted documentation with AI-powered content management.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5.24.2-blue)](https://strapi.io/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.9.1-brightgreen)](https://docusaurus.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/6a33867d-d982-4344-a7ff-f0056521439c)

FlowDocs is an innovative documentation system that bridges the gap between natural language conversations and professional documentation sites. Simply talk to an AI assistant (like Claude), and watch your ideas transform into structured, searchable documentation in real-time.

## ✨ Key Features

- 🤖 **AI-Powered Content Creation** - Create documentation through natural conversation with Claude Desktop
- 🔄 **Real-Time Sync** - Changes appear instantly on your documentation site
- 📝 **Full CRUD Operations** - Create, read, update, and delete documentation via natural language
- 🎨 **Beautiful UI** - Modern, responsive documentation powered by Docusaurus
- 🔍 **Smart Search** - Full-text search across all your documentation
- 🏷️ **Tag & Categorize** - Organize content with flexible tagging system
- 🚀 **One-Click Deployment** - Single script starts all services
- 🔌 **Extensible Architecture** - Built with modern, modular technologies

## 🎯 Use Cases

- **Technical Documentation** - API docs, guides, tutorials
- **Knowledge Bases** - Internal wikis, FAQs, processes
- **Content Publishing** - Blogs, articles, educational content
- **Project Documentation** - Architecture docs, release notes, specifications

## 🏗️ **System Architecture**

```
User Chat (Claude Desktop) → MCP Server → Strapi API → Content Storage
                                    ↑
                                    ↓
                                 Hot Sync → Docusaurus Site Rendering
```

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Git
- Modern web browser

### 1. Clone and Setup
```bash
git clone <repository-url>
cd flowdocs
```

### 2. Start All Services
```bash
./start-all.sh
```

This launches:
- **Strapi CMS** at http://localhost:1337 (Admin: /admin)
- **Docusaurus Site** at http://localhost:3000
- **MCP Server** (for Claude Desktop integration)

### 3. Claude Desktop Configuration
1. Open Claude Desktop settings
2. The MCP server is auto-configured
3. Restart Claude to load tools

### 4. Test Integration
Ask Claude: *"What tools do you have available?"*
You should see 6 Strapi documentation tools listed.

## 📋 **Setup Steps (Executed During Implementation)**

### Phase 1: Strapi CMS Setup
- Installed Strapi v5.24.2 via npx quickstart
- Created "Article" content type with fields:
  - title (Required, String)
  - slug (UID, auto-generated)
  - content (RichText, Required)
  - category (String)
  - tags (Many-to-Many Relation to Tag)
  - author (String, default "AI Generated")
  - excerpt (Text)
  - articlestatus (Enum: draft/published, default "published")
- Configured API permissions (Public: read, Authenticated: create/update/delete)
- Generated full-access API token (store securely in environment variables)
- Tested API endpoints successfully

### Phase 2: Docusaurus Documentation Site
- Created TypeScript Docusaurus v3 site
- Implemented Strapi integration client (`src/lib/strapiClient.ts`)
- Built sync system (`scripts/syncContent.js`):
  - Fetches articles from Strapi API
  - Generates Markdown files in `docs/ai-generated/`
  - Updates Docusaurus sidebar configuration
- Added hot-reload watcher (`scripts/watcher.js`):
  - Polls Strapi API every 10 seconds
  - Auto-regenerates content on changes
- Configured sidebar categories for AI-generated content

### Phase 3: MCP Server Implementation
- Built custom MCP server (`src/simple-server.js`)
- Handles JSON-RPC 2.0 protocol over stdio
- Implements 6 documentation management tools:
  - `create_documentation_page` - Create new articles
  - `list_documentation_pages` - List/filter articles
  - `update_documentation_page` - Update existing articles
  - `get_documentation_page` - Fetch articles by ID/slug
  - `delete_documentation_page` - Delete articles
  - `search_documentation` - Full-text search
- Proper error handling and response formatting
- Claude Desktop MCP configuration updated

### Phase 4: Orchestration & Testing
- Created unified startup script (`start-all.sh`):
  - Launches all services simultaneously
  - Handles PID management and cleanup
  - Provides status URLs
- Verified end-to-end functionality:
  - Strapi API responses correctly
  - Docusaurus generates and displays content
  - MCP server responds to Claude tools
  - Hot-sync updates Docusaurus in real-time

## 🔧 **Manual Configuration Required**

### Strapi Setup (When Starting Fresh)
1. After `npm run develop` in strapi/:
   1. Go to http://localhost:1337/admin
   2. Create admin account
   3. Navigate to Content-Types Builder
   4. Create Collection Type: "Article" with above fields
   5. Configure User & Permissions:
      - Public: Enable `find` and `findOne` for Article
      - Authenticated: Enable all operations for Article
   6. Create API Token (Settings → API Tokens):
      - Name: "MCP-Server-Token"
      - Type: Full Access
      - Copy token and add to MCP config env

### Docusaurus Customization (Optional)
- Modify sidebar configuration in `docusaurus/sidebars.ts`
- Add custom themes or plugins via `docusaurus.config.ts`
- Customize article layouts in `docusaurus/src/components/`

### Claude Desktop MCP Setup (Already Configured)
The `/Users/.../claude_desktop_config.json` should contain:
```json
{
  "mcpServers": {
    "strapi-docs": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/src/simple-server.js"],
      "env": {
        "STRAPI_BASE_URL": "http://localhost:1337",
        "STRAPI_API_TOKEN": "your_token_here",
        "DOTENV_CONFIG_SILENT": "true"
      }
    }
  }
}
```

## 🧪 **Testing the System**

1. **Strapi API Test:**
   ```bash
   curl http://localhost:1337/api/articles
   ```

2. **MCP Server Test:** (Manual)
   - Claude: "Create a documentation page about machine learning"

3. **End-to-End Test:**
   - Verify article appears in Strapi admin
   - Check Docusaurus updates within 10 seconds

## 🔍 **Troubleshooting**

### MCP Server Issues
- **Error 400 from Strapi:** Check API permissions and request payload
- **Protocol errors:** Ensure protocol version compatibility
- **Connection failures:** Restart Claude and verify config path

### Sync Issues
- Watcher not updating: Check Strapi API accessibility
- Docusaurus not reloading: Verify webpack is running

### Authentication Issues
- API token expired: Regenerate in Strapi admin
- Permissions denied: Reconfigure user roles

## 📁 **Project Structure**
```
flowdocs/
├── strapi/                 # Strapi CMS instance
├── docusaurus/            # Docusaurus documentation site
│   ├── src/lib/strapiClient.js/ts
│   ├── scripts/syncContent.js
│   ├── scripts/watcher.js
├── mcp-server/            # MCP server for LLM integration
│   ├── src/simple-server.js
│   ├── src/handlers/
├── start-all.sh           # Orchestration script
└── README.md              # This file
```

## 🎯 **Features Completed**
- ✅ Strapi headless CMS with REST API
- ✅ Claude Desktop MCP integration
- ✅ Docusaurus real-time documentation sync
- ✅ Full CRUD operations via natural language
- ✅ Hot-reload content updates
- ✅ Production-ready architecture
- ✅ Orchestrated multi-service startup

## 🚀 **Next Steps (Future Enhancements)**
- Webhook-based sync (vs polling)
- Rich text editor integration
- Content versioning system
- Multi-provider LLM support (OpenAI, Anthropic, etc.)
- Docker containerization
- Production deployment guides
- CI/CD pipeline templates
- Multi-language support
- Advanced analytics and metrics

## 🤝 **Contributing**

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Built with [Strapi](https://strapi.io/) - The leading open-source headless CMS
- Documentation powered by [Docusaurus](https://docusaurus.io/) - Easy to maintain documentation websites
- AI integration via [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- Inspired by the need for seamless AI-human collaboration in documentation

## 📧 **Support**

- 📖 Documentation: Check out the docs at `http://localhost:3000` when running locally
- 🐛 Issues: [GitHub Issues](issues)
- 💬 Discussions: [GitHub Discussions](discussions)

## ⭐ **Star History**

If you find this project useful, please consider giving it a star! It helps others discover the project.

---

**Built with ❤️ for the open-source community**
