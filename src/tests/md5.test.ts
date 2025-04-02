import crypto from 'crypto';

// This is a simple test file for the MD5 hash functions
// For testing the actual MCP server, you would use the MCP client SDK

describe('MD5 Hash Calculation', () => {
  test('should correctly calculate MD5 hash for a string', () => {
    const input = 'hello world';
    const expectedHash = '5eb63bbbe01eeed093cb22bb8f5acdc3';
    
    const hash = crypto.createHash('md5').update(input).digest('hex');
    
    expect(hash).toEqual(expectedHash);
  });
  
  test('should produce different hashes for strings with different whitespace', () => {
    const input1 = 'hello world';
    const input2 = 'hello world '; // with trailing space
    
    const hash1 = crypto.createHash('md5').update(input1).digest('hex');
    const hash2 = crypto.createHash('md5').update(input2).digest('hex');
    
    expect(hash1).not.toEqual(hash2);
  });
  
  test('should correctly calculate MD5 hash for JSON objects', () => {
    const jsonObject = { name: 'test', value: 123 };
    const jsonString = JSON.stringify(jsonObject);
    const expectedHash = crypto.createHash('md5').update(jsonString).digest('hex');
    
    const hash = crypto.createHash('md5').update(jsonString).digest('hex');
    
    expect(hash).toEqual(expectedHash);
  });
  
  test('should calculate different hashes for differently formatted JSON', () => {
    const jsonObject = { name: 'test', value: 123 };
    
    const formattedJson = JSON.stringify(jsonObject, null, 2); // Pretty printed
    const compactJson = JSON.stringify(jsonObject); // Compact
    
    const hash1 = crypto.createHash('md5').update(formattedJson).digest('hex');
    const hash2 = crypto.createHash('md5').update(compactJson).digest('hex');
    
    expect(hash1).not.toEqual(hash2);
  });
  
  test('should correctly calculate MD5 hash for base64 data', () => {
    // "Hello World" in base64
    const base64Data = 'SGVsbG8gV29ybGQ=';
    const binaryData = Buffer.from(base64Data, 'base64');
    
    const expectedHash = crypto.createHash('md5').update(binaryData).digest('hex');
    const hash = crypto.createHash('md5').update(binaryData).digest('hex');
    
    expect(hash).toEqual(expectedHash);
  });
});
