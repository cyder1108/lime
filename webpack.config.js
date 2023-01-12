const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //mode: "production",
  //mode: "development",
  devtool: "source-map",
  entry: "./src/scripts/application.tsx",
  output: {
    filename: "all.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx|mjs)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-modules-amd",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-private-methods",
              "@babel/plugin-proposal-private-property-in-object",
              "@babel/plugin-transform-runtime",
            ]
          }
        }
      }

    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      events: 'events',
    }),
    new MiniCssExtractPlugin({
      filename: 'all.css',
    }),
  ],

  watchOptions: {
    ignored: /node_modules/
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".mjs"],
    alias: {
      assert: "assert",
      buffer: "buffer",
      console: "console-browserify",
      constants: "constants-browserify",
      crypto: "crypto-browserify",
      domain: "domain-browser",
      events: "events",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      path: "path-browserify",
      punycode: "punycode",
      process: "process/browser",
      querystring: "querystring-es3",
      stream: "stream-browserify",
      _stream_duplex: "readable-stream/duplex",
      _stream_passthrough: "readable-stream/passthrough",
      _stream_readable: "readable-stream/readable",
      _stream_transform: "readable-stream/transform",
      _stream_writable: "readable-stream/writable",
      string_decoder: "string_decoder",
      sys: "util",
      timers: "timers-browserify",
      tty: "tty-browserify",
      url: "url",
      util: "util",
      vm: "vm-browserify",
      zlib: "browserify-zlib"
    },
  },
  target: ["web"],
}
