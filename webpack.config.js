const path = require("path");

module.exports = {
  optimization: {
    minimize: true
  },
  mode: "production",
  entry: { fluentSort: "./src/index.js", pureSort: "./src/pure.js" },
  output: {
    path: path.resolve(__dirname, "build", "dist"),
    filename: "[name].min.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      }
    ]
  }
};
