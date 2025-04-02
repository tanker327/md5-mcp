import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverPath = path.resolve(__dirname, "../dist/index.js");

// This script demonstrates how to use the MD5-MCP server from a Node.js client
async function main() {
  // Create a transport that starts the server as a child process
  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath]
  });

  // Create a client
  const client = new Client(
    { name: "md5-test-client", version: "1.0.0" },
    {
      capabilities: {
        resources: {},
        prompts: {},
        tools: {}
      }
    }
  );

  try {
    // Connect to the server
    await client.connect(transport);
    console.log("Connected to MD5-MCP server");

    // Test string MD5 calculation
    console.log("\n--- Testing calculateMD5 ---");
    const stringResult = await client.callTool({
      name: "calculateMD5",
      arguments: {
        input: "Hello, World!",
        trimWhitespace: false
      }
    });
    console.log((stringResult.content as { text: string }[])[0].text);

    // Test string with trailing space
    console.log("\n--- Testing calculateMD5 with trailing space ---");
    const stringWithSpaceResult = await client.callTool({
      name: "calculateMD5",
      arguments: {
        input: "Hello, World! ",
        trimWhitespace: false
      }
    });
    console.log((stringWithSpaceResult.content as { text: string }[])[0].text);

    // Test the same string with trimming enabled
    console.log("\n--- Testing calculateMD5 with trimming enabled ---");
    const trimmedResult = await client.callTool({
      name: "calculateMD5",
      arguments: {
        input: "Hello, World! ",
        trimWhitespace: true
      }
    });
    console.log((trimmedResult.content as { text: string }[])[0].text);

    // Test JSON MD5 calculation
    console.log("\n--- Testing calculateJSONMD5 ---");
    const jsonResult = await client.callTool({
      name: "calculateJSONMD5",
      arguments: {
        jsonData: { name: "John", age: 30, isActive: true },
        preserveFormatting: true
      }
    });
    console.log((jsonResult.content as { text: string }[])[0].text);

    // Test base64 MD5 calculation
    console.log("\n--- Testing calculateBase64MD5 ---");
    const base64Result = await client.callTool({
      name: "calculateBase64MD5",
      arguments: {
        base64Data: "SGVsbG8sIFdvcmxkIQ==" // "Hello, World!" in base64
      }
    });
    console.log((base64Result.content as { text: string }[])[0].text);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Always disconnect when done
    await client.close();
    console.log("\nDisconnected from server");
  }
}

main();
