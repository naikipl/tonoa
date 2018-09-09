var path = require("path");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "index.js"
  },
  target: "node",
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, "src")
    ]
  },
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
        exclude: /node_modules/,
        use: 'json'
      }
    ]
  }
};