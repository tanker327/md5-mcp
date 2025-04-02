#!/usr/bin/env node

import { startServer } from '../dist/index.js';

// This simple wrapper allows the provider to be run directly
// from a global npm installation with the command: md5-mcp
startServer().catch(error => {
  console.error("Failed to start MD5 MCP provider:", error);
  process.exit(1);
});
