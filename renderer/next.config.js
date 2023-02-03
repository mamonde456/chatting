module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = ["web", "es6"];
    }
    config.output.globalObject = "this";
    return config;
  },
};
