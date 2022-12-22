const webpack = require('webpack');
module.exports = {
  mode: "production",
  //mode: "development",
  //devtool: "inline-source-map",
  entry: [
    "./assets/es/application.js",
  ],
  output: { filename: "all.js" },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules\/(?!(__es6modules__))/,
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
  ],
  resolve: {
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
