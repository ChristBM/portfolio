const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
      path: path.resolve(__dirname, "build"),
      filename: "[main].[contenthash].js",
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
  },
  mode: 'production',
  resolve: {
      extensions: ['.js'],
      alias: {
          '@styles': path.resolve(__dirname, 'src/styles/sass/'),
          '@images': path.resolve(__dirname, 'src/assets/img/'),
      },
  },
  module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
          }
        },
        {
          test: /\.css|.scss$/i,
          use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
        },
        {
            test: /\.webp|svg$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/images/[hash][ext][query]',
            }
        },
        {
            test: /\.(woff)$/,
            type: 'asset/resource',
            generator: {
                filename: 'assets/fonts/[hash][ext][query]',
            }
        },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Portfolio',
      filename: "index.[contenthash].html",
      template: "./src/index.ejs",
      inject: 'body',
    }),
    new CopyPlugin({
      patterns:[{
        from: path.resolve(__dirname,'src/assets/img'),
        to: 'assets/images'
      }]
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: true,
      }),
    ]
  }

}