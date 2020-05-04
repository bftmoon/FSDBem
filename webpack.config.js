const webpack = require('webpack')
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const KIT_PAGES_DIR = path.resolve(__dirname, 'src/pages/kit-pages');
const KIT_PAGES = fs.readdirSync(KIT_PAGES_DIR).filter((value => value !== 'common'));

const config = {
  resolve: {
    alias: {
      styleVars: path.resolve(__dirname, 'src/kit/env-styles/variables.scss'),
      '@res': path.resolve(__dirname, 'res'),
    },
  },
  entry: {
    app: './src/index.js'
    // test: './src/pages/test/test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[contenthash].[name].js",
  },
  devtool: 'inline-source-map', // path of error
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/kit-pages/2/2.pug',
      // template: './src/pages/kit-pages/3/3.pug',
      // template: './src/pages/test/test.pug',
      // template: './src/pages/kit-pages/1/1.pug'
    }),
    // ...KIT_PAGES.map((page) => new HtmlWebpackPlugin({
    //   filename: `${page}.html`,
    //   template: `${KIT_PAGES_DIR}/${page}/${page}.pug`,
    // })),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
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
                autoprefixer()
              ],
              sourceMap: true
            }
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
              outputPath: 'imgs/'
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
      },
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    overlay: true,
  },

};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
  }
  if (argv.mode === 'production') {
  }
  return config;
}
