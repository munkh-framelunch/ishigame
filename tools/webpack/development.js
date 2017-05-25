import webpack from 'webpack';
import base from './base';

export default Object.assign({}, base, {
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: false }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  ]
});
