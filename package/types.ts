export interface TsConfig {
  compilerOptions: {
    /* Base Options */
    esModuleInterop: boolean;
    skipLibCheck: boolean;
    target: string;
    allowJs: boolean;
    resolveJsonModule: boolean;
    moduleDetection: string;
    isolatedModules: boolean;
    verbatimModuleSyntax: boolean;
    strict: boolean;
    noUncheckedIndexedAccess: boolean;
    noImplicitOverride: boolean;

    /* Conditional Options */
    outDir?: string;
    module?: string;
    sourceMap?: boolean;
    declaration?: boolean;
    composite?: boolean;
    declarationMap?: boolean;
    lib?: string[];
    noEmit?: boolean;
  };
}

export type ConfigOptions = {
  projectName: string;
  projectDescription: string;
  transpileOptions: {
    transpile: boolean;
    outputDir?: string;
    projectType?: string;
  };
  libraryOptions: {
    isLibrary: boolean;
    isForMonorepo?: boolean;
  };
  dom: boolean;
};
