/** @type {import('react-native-unistyles/plugin').UnistylesPluginOptions} */
const unistylesPluginOptions = {
  // pass root folder of your application
  // all files under this folder will be processed by the Babel plugin
  // if you need to include more folders, or customize discovery process
  // check available babel options
  root: "src",
  autoProcessImports: ["expo-router"],
};

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-unistyles/plugin", unistylesPluginOptions],

      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
