const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

const config = {
  entry: {
    kitInputs: './src/pages/kit-pages/2/2.js',
    // kitColors: './src/pages/kit-pages/1/1.js',
    // kitCards: './src/pages/kit-pages/3/3.js',
    // kitSections: './src/pages/kit-pages/2/4.js'
    // test: './src/pages/test/test.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  devtool: 'inline-source-map', // path of error
  plugins: [
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: 'Montserrat', subsets:['latin', 'cyrillic'],  variants: [ '400', '700' ]  },
    //     { family: 'Quicksand', subsets:['latin'],  variants: [ '400', '700' ]  },
    //   ]
    // }),
    new HtmlWebpackPlugin({
      template: './src/pages/kit-pages/2/2.pug',
      // template: './src/pages/test/test.pug',
      // template: './src/pages/kit-pages/1/1.pug'
    }),
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
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // include: [
        //   path.resolve(__dirname, 'res/fonts')
        // ],
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
  }

};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
  }
  if (argv.mode === 'production') {
  }
  return config;
}
