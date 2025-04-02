# MD5-MCP: MD5 Hash Calculator MCP Server

A Model Context Protocol (MCP) server for calculating MD5 hashes from various data types. This server provides tools to calculate MD5 hashes from strings, JSON data, and base64-encoded binary data.

## Features

-   Calculate MD5 hashes from plain text strings with optional whitespace trimming
-   Calculate MD5 hashes from various JSON data types (strings, numbers, booleans, objects, arrays)
-   Calculate MD5 hashes from base64-encoded binary data
-   Control formatting options (like preserving whitespace or JSON formatting)
-   Easy integration with Claude and other MCP-compatible clients

## Installation

### NPM Global Installation (Recommended)

```bash
# Install globally
npm install -g md5-mcp-server

# Run the server directly
md5-mcp-server
```

### Local Installation

```bash
# Install locally in your project
npm install md5-mcp-server

# Add to your package.json scripts
# "scripts": {
#   "start-md5-server": "md5-mcp-server"
# }
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/tanker327/md5-mcp.git
cd md5-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Usage

### Starting the server

If installed globally:

```bash
md5-mcp-server
```

If installed locally:

```bash
npx md5-mcp-server
```

This will start the MCP server using the stdio transport, which allows it to be used with MCP clients like Claude for Desktop.

### Configuring with Claude for Desktop

Add the following to your Claude for Desktop configuration:

```json
{
    "mcpServers": {
        "md5-calculator": {
            "command": "npx",
            "args": ["md5-mcp-server"]
        }
    }
}
```

If you installed globally, you can simplify to:

```json
{
    "mcpServers": {
        "md5-calculator": {
            "command": "md5-mcp-server"
        }
    }
}
```

### Available Tools

#### 1. calculateMD5

Calculates an MD5 hash from a string input.

Parameters:

-   `input` (string): The string to calculate an MD5 hash for
-   `trimWhitespace` (boolean, optional): Whether to trim whitespace from the input before hashing (default: false)

Example:

```
@md5-calculator calculateMD5 --input="Hello, World!" --trimWhitespace=false
```

#### 2. calculateJSONMD5

Calculates an MD5 hash from JSON data.

Parameters:

-   `jsonData` (any JSON type): JSON data (string, number, boolean, object, or array) to hash
-   `preserveFormatting` (boolean, optional): Whether to preserve JSON formatting or compact it before hashing (default: true)

Example:

```
@md5-calculator calculateJSONMD5 --jsonData={"name": "John", "age": 30} --preserveFormatting=true
```

#### 3. calculateBase64MD5

Calculates an MD5 hash from base64-encoded binary data.

Parameters:

-   `base64Data` (string): Base64-encoded binary data to calculate an MD5 hash for

Example:

```
@md5-calculator calculateBase64MD5 --base64Data="SGVsbG8sIFdvcmxkIQ=="
```

## Important Notes on MD5 Hashing

-   MD5 is sensitive to every character, including whitespace. Strings with and without trailing spaces will produce different hashes.
-   When hashing JSON objects, the formatting (indentation, line breaks, etc.) affects the hash. Use the `preserveFormatting` option to control this behavior.
-   MD5 is no longer considered cryptographically secure for sensitive applications. It is suitable for data integrity checks but not for security-critical applications.

## Programmatic API

You can also use this package programmatically in your Node.js applications:

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create a transport that starts the server as a child process
const transport = new StdioClientTransport({
    command: "npx",
    args: ["md5-mcp-server"],
});

// Create a client
const client = new Client(
    { name: "my-app", version: "1.0.0" },
    { capabilities: { resources: {}, prompts: {}, tools: {} } }
);

// Connect to the server
await client.connect(transport);

// Calculate MD5 hash
const result = await client.callTool({
    name: "calculateMD5",
    arguments: {
        input: "Hello, World!",
        trimWhitespace: false,
    },
});

console.log(result.content[0].text);

// Don't forget to disconnect when done
await client.disconnect();
```

## Development

### Running in development mode

```bash
npm run dev
```

This starts TypeScript in watch mode, automatically recompiling when files change.

### Running tests

```bash
npm test
```

### Publishing to npm

To publish a new version:

```bash
# Update version in package.json
npm version patch # or minor, or major

# Publish to npm
npm publish
```

The `prepublishOnly` script will automatically run tests and build the project before publishing.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
