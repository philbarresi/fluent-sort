const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/fluentSort.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "fluentSort.min.js",
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
