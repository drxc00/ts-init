#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { createTsConfigFile, initNpmApp } from "./scripts.js";
import type { ConfigOptions } from "./types.js";

function main() {
  const program = new Command();
  program
    .name("ts-init")
    .description("Yet another typescript tool.")
    .version("1.0.0")
    .option("-n, --name <name>", "Project name")
    .option("-d, --description <description>", "Project description")
    .option(
      "-t, --transpile <transpile>",
      "Do you want to transpile your project?"
    )
    .option("-o, --output-dir <outputDir>", "What is your output directory?")
    .option("-l, --library <library>", "Are you building a library?")
    .option("-m, --monorepo <monorepo>", "Is the library for a monorepo?")
    .option("-b, --dom <dom>", "Will your app be running in the browser?")

    .action(async (options) => {
      try {
        /**
         * @type {ConfigOptions}
         * @description Config options for CLI tool
         * @default { projectName: "", projectDescription: "", transpileOptions: { transpile: false }, libraryOptions: { isLibrary: false, isForMonorepo: false }, dom: false }
         *
         * This is the main action of the CLI tool
         */

        const config: ConfigOptions = {
          projectName: "",
          projectDescription: "",
          transpileOptions: {
            transpile: false,
          },
          libraryOptions: {
            isLibrary: false,
            isForMonorepo: false,
          },
          dom: false,
        };

        /** Checks if the user has provided a project name */
        if (!options.name) {
          const nameAnswer = await inquirer.prompt([
            {
              type: "input",
              name: "projectName",
              message: "What is your project name?",
              default: "ts-app",
            },
          ]);
          config.projectName = nameAnswer.projectName;
        } else {
          config.projectName = options.name;
        }

        /** Checks if the user has provided a project description */
        if (!options.description) {
          const descriptionAnswer = await inquirer.prompt([
            {
              type: "input",
              name: "projectDescription",
              message: "What is your project description?",
              default: "Typescript app created with ts-init",
            },
          ]);
          config.projectDescription = descriptionAnswer.projectDescription;
        } else {
          config.projectDescription = options.description;
        }

        /** Checks if the user has provided a transpile option */
        if (!options.transpile) {
          const isTranspiled = await inquirer.prompt([
            {
              type: "confirm",
              name: "transpile",
              message: "Do you want to transpile your project?",
              default: true,
            },
          ]);

          /**
           * If transpiled is true, ask for extra transpile options
           * We need to know the output directory and if the project is a library
           * If the project is a library, we need to know if it's for a monorepo
           */
          if (isTranspiled.transpile) {
            const transpiledOptions = await inquirer.prompt([
              {
                type: "input",
                name: "outputDir",
                message: "What is your output directory?",
                default: "dist",
              },
              {
                type: "confirm",
                name: "isLibrary",
                message: "Are you building a library?",
                default: false,
              },
            ]);

            /**
             * If the project is a library, ask if it's for a monorepo
             */
            if (transpiledOptions.isLibrary) {
              const monorepoInquery = await inquirer.prompt([
                {
                  type: "confirm",
                  name: "isForMonorepo",
                  message: "Is the library for a monorepo?",
                  default: false,
                },
              ]);
              config.libraryOptions.isForMonorepo =
                monorepoInquery.isForMonorepo;
            }

            // Set the transpile options
            config.transpileOptions.transpile = true;
            config.transpileOptions.outputDir = transpiledOptions.outputDir;
            config.libraryOptions.isLibrary = transpiledOptions.isLibrary;
          }
        }

        /**
         * DOM options
         * Ask if the project will be running in the browser
         * When running in the browser, there are some types that need to be added to the tsconfig.json file
         * These are the types for DOM and DOM.Iterable
         */
        if (!options.dom) {
          const domAnswer = await inquirer.prompt([
            {
              type: "confirm",
              name: "dom",
              message: "Will your app be running in the browser?",
              default: false,
            },
          ]);
          config.dom = domAnswer.dom;
        } else {
          config.dom = options.dom;
        }

        /**
         * Create the ts config file
         * Create tsconfig.json
         * install dependencies
         */
        createTsConfigFile({
          compilerOptions: {
            /* Base Options: */
            esModuleInterop: true,
            skipLibCheck: true,
            target: "es2022",
            allowJs: true,
            resolveJsonModule: true,
            moduleDetection: "force",
            isolatedModules: true,
            verbatimModuleSyntax: true,
            strict: true,
            noUncheckedIndexedAccess: true,
            noImplicitOverride: true,
            /** Custom Options: */
            ...(config.transpileOptions.transpile
              ? {
                  /* If transpiling with TypeScript, tsc */
                  outDir: config.transpileOptions.outputDir,
                  module: "NodeNext",
                  sourceMap: true,
                }
              : {
                  /* If NOT transpiling with TypeScript: */
                  module: "preserve",
                  noEmit: true,
                }),
            ...(config.libraryOptions.isLibrary && {
              /** If building a library */
              declaration: true,
            }),
            ...(config.libraryOptions.isForMonorepo && {
              /** If building a library for a monorepo */
              composite: true,
              declarationMap: true,
            }),
            ...(config.dom
              ? {
                  lib: ["es2022", "DOM", "DOM.Iterable"],
                }
              : {
                  lib: ["es2022"],
                }),
          },
        });

        /** Initilize the npm app */
        initNpmApp(config.projectName, config.projectDescription);
      } catch (error) {
        console.error(chalk.red("An error occurred:"), error);
      }
    });

  program.parse();
}

main();
