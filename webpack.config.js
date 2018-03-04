const webpack = require('webpack');

const path = require('path');

const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProduction = NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
  filename: 'css/main.css',
});

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      'js/vendor': [
        'react',
        'react-dom',
        'react-router-dom/BrowserRouter',
        'react-router-dom/StaticRouter',
        'react-router-dom/Link'
      ],
      'js/bundle': [
        './src/client.js'
      ],
      'css/bundle': './src/assets/stylesheets/index.scss'
    },
    output: {
      filename: `[name].js`,
      publicPath: '/static/',
      path: path.resolve(__dirname, 'dist', 'public')
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [{
              loader: 'css-loader',
              options: { minimize: true }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader'
            }],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      extractSass,
      isProduction ? new uglifyJSPlugin() : _ => null,
      new CopyWebpackPlugin([
        {
          from: 'src/assets/images',
          to: 'images'
        },
        //add more as or when we need them
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(NODE_ENV)
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'js/vendor',
        minChunks: Infinity
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
];
