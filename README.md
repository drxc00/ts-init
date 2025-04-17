# ts-init

Setting up a `tsconfig.json` can be confusing and time-consuming — TS-INIT simplifies the process. It's a lightweight CLI tool that helps you quickly scaffold a clean, minimal TypeScript project. Perfect for starting small projects or experimenting with TypeScript without the hassle.

## Installation

```bash
npm install -g @drxc00/ts-init
```

## Usage

```bash
npx ts-init || npx ts-init [options]
```

## Options

| Option                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `-n, --name <name>`               | Project name (default: "ts-app")                        |
| `-d, --description <description>` | Project description                                     |
| `-t, --transpile <transpile>`     | Enable TypeScript transpilation (default: true)         |
| `-o, --output-dir <outputDir>`    | Output directory for transpiled files (default: "dist") |
| `-l, --library <library>`         | Configure as a library project (default: false)         |
| `-m, --monorepo <monorepo>`       | Configure for monorepo usage (default: false)           |
| `-b, --dom <dom>`                 | Configure for browser/DOM usage (default: false)        |

## Example

```bash
ts-init --name my-project --description "My awesome project" --transpile true --output-dir build
```

## Development

To contribute or modify:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes
4. Build the project:
   ```bash
   npm run build
   ```

## Acknowledgement

- [Matt Pocock' Cheet Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)
