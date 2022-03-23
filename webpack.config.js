import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

export default {
  entry: {
    'read-fixtures': './src/index.ts',
    'read-fixtures.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'ReadFixtures',
      umdNamedDefine: true
    },
  resolve: {
    fallback: {
      path: '../node_modules/path-browserify/index.js',
      fs: false
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      })
   ]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  }
}
