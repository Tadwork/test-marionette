var webpack = require("webpack");
module.exports = {
  entry: {
      "bundle":['./app/app.js']
  },
  output: {
    path: __dirname + "/public",
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: './app',
    extensions: ['', '.webpack.js', '.web.js', '.js','.html'],
  },
  devtool:'source-map',
  module: {
    loaders: [
      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader' },
   ]
  },
   plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]
};
