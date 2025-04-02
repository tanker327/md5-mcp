#!/usr/bin/env node

import { startServer } from '../dist/index.js';

// This simple wrapper allows the server to be run directly
// from a global npm installation with the command: md5-mcp-server
startServer().catch(error => {
  console.error('Failed to start MD5 MCP server:', error);
  process.exit(1);
});
