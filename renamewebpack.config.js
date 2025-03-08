const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "net": false,
      "tls": false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  ]
};
