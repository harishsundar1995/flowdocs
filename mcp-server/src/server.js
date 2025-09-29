const { Server } = require('@modelcontextprotocol/sdk/server/stdio');
const tools = require('./handlers/tools');

// Create MCP server
const server = new Server({
  name: 'strapi-docs-mcp',
  version: '1.0.0',
});

// Handler for listTools
server.setRequestHandler('tools/list', async () => {
  console.error('Listing tools');
  return { tools: tools.map(team => ({
    name: team.name,
    description: team.description,
    inputSchema: team.inputSchema,
  })) };
});

// Handler for callTool
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  console.error(`Calling tool: ${name} with args:`, args);

  const tool = tools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Tool '${name}' not found`);
  }

  const result = await tool.handler(args);
  console.error(`Tool ${name} result:`, result);
  return { content: [{ type: 'text', text: JSON.stringify(result) }] };
});

// Start server
server.listen().then(() => {
  console.error('MCP Server started');
}).catch(error => {
  console.error('Failed to start MCP server:', error.message);
  process.exit(1);
});
