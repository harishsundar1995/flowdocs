const { spawn } = require('child_process'); // Not needed
const readline = require('readline');
const tools = require('./handlers/tools');

const rl = readline.createInterface({
  input: process.stdin,
  output: null, // We don't use stdout for readline
  terminal: false,
});

let nextId = 1;

// Function to send JSON response
function sendResponse(response) {
  console.log(JSON.stringify(response)); // Send to stdout
}

// Handle incoming messages
rl.on('line', async (line) => {
  try {
    const message = JSON.parse(line);

    if (message.method === 'initialize') {
      // Initialize response
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          protocolVersion: '2025-06-18',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'strapi-docs-mcp',
            version: '1.0.0',
          },
        },
      };
      sendResponse(response);
    } else if (message.method === 'tools/list') {
      // List tools
      const response = {
        jsonrpc: '2.0',
        id: message.id,
        result: {
          tools: tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
          })),
        },
      };
      sendResponse(response);
    } else if (message.method === 'initialized') {
      // Acknowledge initialization
      console.error('Initialized');
      // No response needed
      return;
    } else if (message.method === 'tools/call') {
      // Call tool
      const { name, arguments: args } = message.params;
      console.error(`Executing tool: ${name}`);

      const tool = tools.find(t => t.name === name);
      if (!tool) {
        const errorResponse = {
          jsonrpc: '2.0',
          id: message.id,
          error: {
            code: -32601,
            message: `Method '${name}' not found`,
          },
        };
        sendResponse(errorResponse);
        return;
      }

      try {
        const result = await tool.handler(args);
        const response = {
          jsonrpc: '2.0',
          id: message.id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(result) }],
          },
        };
        sendResponse(response);
      } catch (e) {
        const errorResponse = {
          jsonrpc: '2.0',
          id: message.id,
          error: {
            code: -32000,
            message: e.message,
          },
        };
        sendResponse(errorResponse);
      }
    }
  } catch (e) {
    console.error('Parse error:', e.message);
    // Send parse error
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error',
      },
    };
    sendResponse(errorResponse);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

console.error('MCP Server started (simple mode)');
