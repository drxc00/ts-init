import fs from "fs";
import path from "path";
import type { TsConfig } from "./types.js";
import { execSync } from "child_process";
import chalk from "chalk";

export function initNpmApp(
  name: string,
  description: string,
  createSrcFolder: boolean = false
) {
  /**
   * @param {string} name - The name of the project
   * @param {string} description - The description of the project
   * @returns {void}
   * @description
   * This funtion creates a npm app
   * It runs npm init and then modifies the package.json
   * Then it installs typescript and @types/node as dev dependencies
   */
  try {
    // Indicate that we are initializing npm project
    console.log(chalk.green("Initializing npm project..."));

    const rootDir = process.cwd();

    // Run default init
    execSync("npm init -y", { stdio: "ignore" });

    /**
     * Read and modify package.json
     * Set the name and description
     * Set type to module
     * Install typescript and @types/node as dev dependencies
     */
    const pkgPath = path.join(rootDir, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.name = name;
    pkg.description = description;
    pkg.type = "module";

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    if (createSrcFolder) {
      const srcPath = path.join(rootDir, "src");
      fs.mkdirSync(srcPath);
      fs.writeFileSync(path.join(srcPath, "index.ts"), "");
    }

    // Install dependencies
    execSync("npm install --save-dev typescript @types/node", {
      cwd: rootDir,
      stdio: "ignore",
    });

    console.log(chalk.green("Initialized npm project."));
  } catch (err) {
    console.error(chalk.red("An error occurred:"), err);
  }
}

export function createTsConfigFile(tsConfig: TsConfig) {
  /**
   * @param {TsConfig} tsConfig - The tsconfig.json file
   * @returns {void}
   * @description
   * This function creates a tsconfig.json file
   * Simply writes the tsconfig.json file to the current working directory base on the provided tsConfig object
   * View the tsConfig object type in types.ts
   */
  try {
    // Ensure that we are in the root directory
    process.chdir(process.cwd());

    // Create tsconfig.json
    fs.writeFileSync(
      path.join(process.cwd(), "tsconfig.json"),
      JSON.stringify(tsConfig, null, 2)
    );
    console.log(chalk.green("Created tsconfig.json"));
  } catch (err) {
    console.error(chalk.red("An error occurred:"), err);
  }
}
