#!/bin/bash
# Start all services for AI Docu-Flow

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Script directory: $SCRIPT_DIR"

echo "Starting Strapi..."
cd "$SCRIPT_DIR/strapi" && npm run develop &
STRAPI_PID=$!

sleep 10

echo "Starting Docusaurus..."
cd "$SCRIPT_DIR/docusaurus" && npm start &
DOCUSAURUS_PID=$!

sleep 5

echo "Starting MCP Server..."
cd "$SCRIPT_DIR/mcp-server" && npm start &
MCP_PID=$!

sleep 5

echo "Starting content watcher..."
cd "$SCRIPT_DIR/docusaurus" && node scripts/watcher.js &
WATCHER_PID=$!

echo "All services started!"
echo "Strapi: http://localhost:1337/admin"
echo "Docusaurus: http://localhost:3000"
echo "PIDs: Strapi=$STRAPI_PID, Docusaurus=$DOCUSAURUS_PID, MCP=$MCP_PID, Watcher=$WATCHER_PID"

# Wait for interrupt to stop all
trap "echo 'Stopping all...'; kill $STRAPI_PID $DOCUSAURUS_PID $MCP_PID $WATCHER_PID; exit" INT
wait
