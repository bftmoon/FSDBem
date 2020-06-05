const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

function generatePagesData(paths) {
  let entries = {};
  let htmlOptions = [];

  paths.forEach((currentPath) => {
    const dir = path.resolve(__dirname, `src/pages/${currentPath}`);
    const pages = fs.readdirSync(dir).filter(((value) => value !== 'layout'));
    pages.forEach((page) => {
      htmlOptions.push({
        filename: `${page}.html`,
        template: `${dir}/${page}/${page}.pug`,
        chunks: [page]
      });
      entries[page] = `${dir}/${page}/${page}.js`
    })
  })
  return {htmlOptions, entries};
}

const pagesData = generatePagesData([
  'kit-pages',
  'site'
]);

const config = {
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname, 'src/kit/blocks'),
      '@theme': path.resolve(__dirname, 'src/kit/env-styles/theme.scss'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  entry: {
    ...pagesData.entries,
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    overlay: true,
  },

};
module.exports = (env, argv) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      chunks: ['index']
    }),
    ...pagesData.htmlOptions.map((options) => new HtmlWebpackPlugin(options))
  );
  return config;
};
