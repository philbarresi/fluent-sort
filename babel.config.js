module.exports = {
  plugins: ["@babel/plugin-transform-classes"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  ignore: ["**/*.test.js"],

  sourceMaps: true
};
