const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

function generatePagesData(paths) {
  const entries = {};
  const htmlOptions = [];

  paths.forEach((currentPath) => {
    const dir = path.resolve(__dirname, `src/pages/${currentPath}`);
    const pages = fs.readdirSync(dir).filter(((value) => value !== 'layout'));
    pages.forEach((page) => {
      htmlOptions.push({
        filename: `${page}.html`,
        template: `${dir}/${page}/${page}.pug`,
        chunks: [page],
        hash: true
      });
      entries[page] = `${dir}/${page}/${page}.js`;
    });
  });
  return {htmlOptions, entries};
}

const pagesData = generatePagesData([
  'kit-pages',
  'site',
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
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      ignoreOrder: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      chunks: ['index'],
    }),
    ...pagesData.htmlOptions.map((options) => new HtmlWebpackPlugin(options)),
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
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/',
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
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    overlay: true,
  },
};


module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin())
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
      moduleIds: 'hashed',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    };
  }
  return config;
};
