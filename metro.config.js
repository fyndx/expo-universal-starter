// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// FIXME: Moti tslib issue
const ALIASES = {
  tslib: path.resolve(__dirname, "node_modules/tslib/tslib.es6.js"),
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

module.exports = config;
