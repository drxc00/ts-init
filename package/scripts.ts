import fs from "fs";
import path from "path";
import type { TsConfig } from "./types.js";
import { execSync } from "child_process";
import chalk from "chalk";

export function initNpmApp(name: string, description: string) {
  try {
    // Run default init
    execSync("npm init -y", { stdio: "ignore" });

    // Read and modify package.json
    const pkgPath = path.join(process.cwd(), "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.name = name;
    pkg.description = description;
    pkg.type = "module";

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // Install dependencies
    execSync("npm install --save-dev typescript @types/node", {
      stdio: "ignore",
    });

    console.log(chalk.green("Initialized npm project."));
  } catch (err) {
    console.error(chalk.red("An error occurred:"), err);
  }
}

export function createTsConfigFile(tsConfig: TsConfig) {
  fs.writeFileSync(
    path.join(process.cwd(), "tsconfig.json"),
    JSON.stringify(tsConfig, null, 2)
  );
  console.log(chalk.green("Created tsconfig.json"));
}
