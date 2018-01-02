const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/fluent-sort.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "fluent-sort.min.js",
    libraryTarget: "umd",
    library: "fluentSort"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
};
