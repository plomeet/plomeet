module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    "react-native-reanimated/plugin",
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": true,
      "allowUndefined": true
    }]
  ],

};
