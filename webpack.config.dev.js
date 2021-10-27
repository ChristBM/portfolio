const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  mode: 'development',
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
          filename: 'assets/images/[name][ext][query]',
        }
      },
      {
        test: /\.(woff)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '{ ChristBM }',
      filename: "index.html",
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
      filename: "[name].css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode:  'static',
      openAnalyzer:  true,
    }),
  ],

  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 3000,
    open: true,
  },

}