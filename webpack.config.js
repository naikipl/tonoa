var path = require("path");
var fs = require("fs");

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-syntax-flow", "@babel/plugin-transform-flow-strip-types"]
          }
        }
      },
      {
        test: /\.json$/,
        use: 'json'
      }
    ]
  }
};