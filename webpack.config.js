const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    // kitInputs: './src/pages/kit-pages/2/2.js',
    kitColors: './src/pages/kit-pages/1/1.js',
    // kitCards: './src/pages/kit-pages/3/3.js',
    // kitSections: './src/pages/kit-pages/2/4.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      // 'jquery': require.resolve('jquery/src/jquery')
      // '#root': path.resolve(__dirname)
    }
  },
  // devServer: {
  //   port: 3000,
  //     contentBase: './dist',
  // },
  // devtool: 'inline-source-map', // path of error
  plugins: [
    new HtmlWebpackPlugin({
      // template: './src/pages/kit-pages/2/2.pug',
      template: './src/pages/kit-pages/1/1.pug'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      // 'window.$': 'jquery',
      // jQuery: 'jquery',
      // 'window.jQuery': 'jquery',
      // jquery: 'jquery',
      // 'window.jquery': 'jquery',
    })

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
          'sass-loader',
        ],
      },
      // {
      //   test:require.resolve('jquery.maskedinput'),
      //   loader: "imports-loader?this=>window"
      // },
      // {
      //   test:require.resolve('jquery.maskedinput'),
      //   loader: "expose?$!expose?jQuery"
      // },
      // {
      //   test: /[\/\\]node_modules[\/\\]jquery.maskedinput[\/\\]src[\/\\]jquery.maskedinput\.js$/,
      //   loader: "imports-loader?this=>window"
      // },
      // {
      //   test:require.resolve('jquery.maskedinput'),
      //   loader: "imports-loader?define=false"
      // },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
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
      // {
      //   // Exposes jQuery for use outside Webpack build
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   },{
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // }
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
