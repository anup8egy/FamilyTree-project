const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "static/index_bundle.js",
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: {
          test: [/node_modules/],
        },
      },
      {
        test: /\.js$/,
        exclude: {
          test: [/node_modules/],
        },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: {
          test: [/node_modules/],
        },
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
};
