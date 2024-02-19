/*eslint no-undef: "error"*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
    assetModuleFilename: "[name][ext]",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        // options: {
        //   name: "[name].[hash:6].[ext]",
        // outputPath: "images",
        // publicPath: "images",
        // emitFile: true,
        // esModule: false,
        // },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "..", "/build"), // Specify the directory to serve files from
    },
    compress: true,
    port: 3000,
    open: true,
    publicPath: "/",
    historyApiFallback: true,
  },
};
