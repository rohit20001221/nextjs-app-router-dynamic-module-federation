const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    if (!context.isServer) {
      // config.plugins.push(
      //   new webpack.sharing.SharePlugin({
      //     shared: {
      //       react: {
      //         singleton: true,
      //       },
      //     },
      //   })
      // );
    }

    return config;
  },
};

module.exports = nextConfig;
