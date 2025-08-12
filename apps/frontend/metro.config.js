// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const monorepoRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// FIXME: Moti tslib issue
const ALIASES = {
  tslib: path.resolve(monorepoRoot, "node_modules/tslib/tslib.es6.js"),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Ensure you call the default resolver
  return context.resolveRequest(
    context,
    // use an alias if one exists
    ALIASES[moduleName] ?? moduleName,
    platform
  );
};

// For BetterAuth imports
config.resolver.unstable_enablePackageExports = true;

// For Moti
config.resolver.sourceExts.push(
  "mjs" // Add support for .mjs files
);

module.exports = withNativeWind(config, { input: "./global.css" });
