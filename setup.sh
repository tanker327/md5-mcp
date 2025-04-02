#!/bin/bash

# Exit on error
set -e

echo "Setting up MD5-MCP server..."

# Install dependencies
npm install

# Build the project
npm run build

echo "Setup complete! You can now run the server with 'npm start'"
echo "To run the manual test, use: 'node dist/manual-test.js'"
