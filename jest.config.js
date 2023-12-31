const { pathsToModuleNameMapper } = require("ts-jest");
const { loadConfig } = require("tsconfig-paths");

const tsconfig = loadConfig();

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // paths
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.paths, {
    prefix: tsconfig.absoluteBaseUrl,
  }),
};
