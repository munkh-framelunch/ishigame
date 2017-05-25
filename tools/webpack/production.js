import webpack from 'webpack';
import UglifyJs from 'uglifyjs-webpack-plugin';
import base from './base';

process.noDeprecation = true;

export default Object.assign({}, base, {
  cache: false,
  devtool: '',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new UglifyJs(),
  ]
});
