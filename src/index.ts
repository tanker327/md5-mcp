import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import crypto from "crypto";

/**
 * Create an MD5 MCP Server instance with tools for calculating MD5 hashes.
 * 
 * @returns The configured MCP server instance
 */
export function createMD5Server(): McpServer {
  // Create an MCP server
  const server = new McpServer({
    name: "MD5-Calculator",
    version: "1.0.0",
    description: "MCP server for calculating MD5 hashes of various data types"
  });

  // Add an MD5 calculation tool that accepts string input
  server.tool(
    "calculateMD5", 
    { 
      // Define input schema with Zod
      input: z.string().describe("The string to calculate an MD5 hash for"),
      trimWhitespace: z.boolean().optional().default(false).describe("Whether to trim whitespace from the input before hashing")
    }, 
    async ({ input, trimWhitespace }) => {
      // Process the input string based on whitespace preference
      const processedInput = trimWhitespace ? input.trim() : input;
      
      // Calculate MD5 hash
      const hash = crypto.createHash('md5').update(processedInput).digest('hex');
      
      return {
        content: [
          { 
            type: "text", 
            text: `MD5 Hash: ${hash}` 
          }
        ]
      };
    }
  );

  // Add a tool for calculating MD5 from JSON data
  server.tool(
    "calculateJSONMD5",
    {
      // Allow various JSON data types
      jsonData: z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.object({}).passthrough(), // Any JSON object
        z.array(z.any())            // Any JSON array
      ]).describe("JSON data (string, number, boolean, object, or array) to hash"),
      preserveFormatting: z.boolean().optional().default(true).describe("Whether to preserve JSON formatting or compact it before hashing")
    },
    async ({ jsonData, preserveFormatting }) => {
      let stringToHash;
      
      if (typeof jsonData === 'object') {
        // For objects and arrays, stringify with consistent formatting
        stringToHash = preserveFormatting 
          ? JSON.stringify(jsonData)
          : JSON.stringify(jsonData, null, 0);
      } else {
        // For primitive types, convert to string
        stringToHash = String(jsonData);
      }
      
      // Calculate MD5 hash
      const hash = crypto.createHash('md5').update(stringToHash).digest('hex');
      
      return {
        content: [
          {
            type: "text",
            text: `MD5 Hash: ${hash}\nSource data type: ${typeof jsonData}`
          }
        ]
      };
    }
  );

  // Add a tool for calculating MD5 from base64-encoded binary data
  server.tool(
    "calculateBase64MD5",
    {
      base64Data: z.string().describe("Base64-encoded binary data to calculate an MD5 hash for")
    },
    async ({ base64Data }) => {
      try {
        // Decode base64 data
        const binaryData = Buffer.from(base64Data, 'base64');
        
        // Calculate MD5 hash from binary data
        const hash = crypto.createHash('md5').update(binaryData).digest('hex');
        
        return {
          content: [
            {
              type: "text",
              text: `MD5 Hash: ${hash}\nSource: Base64-encoded binary data (${binaryData.length} bytes)`
            }
          ]
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Invalid base64 encoding. Please check your input.`
            }
          ]
        };
      }
    }
  );

  return server;
}

/**
 * Start an MD5 MCP server using stdio transport.
 * This is used when the package is run directly.
 */
export async function startServer(): Promise<void> {
  const server = createMD5Server();
  const transport = new StdioServerTransport();
  
  try {
    await server.connect(transport);
    console.error("MD5 Calculator MCP server started successfully");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Auto-start the server if this module is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
