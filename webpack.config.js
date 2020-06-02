const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const KIT_PAGES_DIR = path.resolve(__dirname, 'src/pages/kit-pages');
const KIT_PAGES = fs.readdirSync(KIT_PAGES_DIR).filter(((value) => value !== 'layout'));
const SITE_PAGES_DIR = path.resolve(__dirname, 'src/pages/site');
const SITE_PAGES = fs.readdirSync(SITE_PAGES_DIR).filter(((value) => value !== 'layout'));

const config = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[contenthash].[name].js',
  },
  devtool: 'inline-source-map',
  plugins: [
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
          'style-loader',
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
  devServer: {
    overlay: true,
  },

};
module.exports = (env, argv) => {
  if (argv.single) {
    config.plugins.push(
      new HtmlWebpackPlugin({

        // for fast switch

        template: './src/pages/kit-pages/form-elements/form-elements.pug',
        // template: './src/pages/kit-pages/headers-and-footers/headers-and-footers.pug',
        // template: './src/pages/kit-pages/cards/cards.pug',
        // template: './src/pages/kit-pages/colors-and-type/colors-and-type.pug'
        // template: './src/pages/site/landing/landing.pug'
        // template: './src/pages/site/search-room/search-room.pug'
        // template: './src/pages/site/room-details/room-details.pug'
      }),
    );
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.pug',
      }),
      ...KIT_PAGES.map((page) => new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `${KIT_PAGES_DIR}/${page}/${page}.pug`,
      })),
      ...SITE_PAGES.map((page) => new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `${SITE_PAGES_DIR}/${page}/${page}.pug`,
      })),
    );
  }
  return config;
};
