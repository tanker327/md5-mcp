// Example of using md5-mcp-server programmatically
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create a transport that starts the server as a child process
const transport = new StdioClientTransport({
  command: "npx",
  args: ["md5-mcp-server"]
});

// Create a client
const client = new Client(
  { name: "md5-example-client", version: "1.0.0" },
  { capabilities: { resources: {}, prompts: {}, tools: {} } }
);

async function main() {
  try {
    // Connect to the server
    await client.connect(transport);
    console.log("Connected to MD5-MCP server");

    // Example 1: Calculate MD5 for a string
    const stringResult = await client.callTool({
      name: "calculateMD5",
      arguments: {
        input: "Hello, World!",
        trimWhitespace: false
      }
    });
    console.log("String MD5:", stringResult.content[0].text);

    // Example 2: Calculate MD5 for a JSON object
    const jsonResult = await client.callTool({
      name: "calculateJSONMD5",
      arguments: {
        jsonData: { name: "John", age: 30, isAdmin: false },
        preserveFormatting: true
      }
    });
    console.log("JSON MD5:", jsonResult.content[0].text);

    // Example 3: Calculate MD5 for base64 data
    const base64Result = await client.callTool({
      name: "calculateBase64MD5",
      arguments: {
        base64Data: "SGVsbG8sIFdvcmxkIQ==" // "Hello, World!" in base64
      }
    });
    console.log("Base64 MD5:", base64Result.content[0].text);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Always disconnect when done
    await client.disconnect();
    console.log("Disconnected from server");
  }
}

main();
