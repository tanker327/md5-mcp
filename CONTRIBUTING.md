# Contributing to MD5-MCP Server

Thank you for considering contributing to the MD5-MCP Server project! This document outlines the process for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/md5-mcp-server.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npm test`

## Development Workflow

1. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests to ensure everything works: `npm test`
4. Commit your changes with a descriptive commit message
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a pull request against the main repository

## Project Structure

```
md5-mcp-server/
├── bin/            # Binary executable files
├── dist/           # Compiled JavaScript (generated)
├── examples/       # Example usage
├── src/            # TypeScript source files
│   ├── index.ts    # Main server entry point
│   └── tests/      # Test files
├── .gitignore      # Git ignore file
├── .npmignore      # NPM ignore file
├── LICENSE         # MIT license
├── package.json    # NPM package configuration
├── README.md       # Project documentation
└── tsconfig.json   # TypeScript configuration
```

## Coding Standards

- Use TypeScript for all source files
- Follow the existing code style and formatting
- Write tests for new features
- Update documentation when necessary

## Adding Features

When adding new features, please:

1. Add appropriate tests in the `src/tests` directory
2. Update the README.md to document the new feature
3. Add an example usage if appropriate

## Pull Request Process

1. Ensure your code passes all tests
2. Update the README.md with details of any changes
3. Submit your pull request with a clear description of the changes

## Release Process

Project maintainers will handle the release process, including:

1. Updating version numbers
2. Publishing to npm
3. Creating GitHub releases

## Questions?

If you have any questions or need help with the contribution process, please open an issue in the repository.

Thank you for contributing!
