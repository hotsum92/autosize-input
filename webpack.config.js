const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {

  return {
    entry: {
      index: './src/index.tsx'
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          },
        },
      ],
    },

    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public'
          },
        ],
      }),
    ],
  }

}
