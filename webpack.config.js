const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const _root = path.resolve(__dirname);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = {

  mode: 'development',

  entry: root('src', 'assets', 'ts', 'main.ts'),

  /**
   * 各ローダーの設定
   */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          'stylus-loader'
        ],
      }
    ]
  },

  /**
   * 拡張子の補完
   */
  resolve: {
    extensions: ['.js', '.ts', '.styl']
  },

  /**
   * プラグイン設定
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src', 'template', 'index.html'),
      title: 'Test Webpack4',
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [require('nib')()],
          import: ['~nib/lib/nib/index.styl']
        }
      }
    })
  ],

  /**
   * webpackのinformation設定
   */
  stats: {
    children: false,
    env: true
  },

  /**
   * webpack-dev-serverの設定
   */
  devServer: {
    stats: "minimal"
  },
};
