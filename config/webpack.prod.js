const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyle(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    pre,
  ].filter(Boolean);
}

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../www"),
    filename: "js/index.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024,
          },
        },
        generator: {
          filename: "static/image/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: "asset/references",
        generator: {
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.css$/i,
        use: getStyle(),
      },
      {
        test: /\.less$/i,
        use: getStyle("less-loader"),
      },

      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CssMinimizerPlugin(),
  ],

  mode: "production",
};
