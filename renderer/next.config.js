module.exports = {
  mainSrcDir: "main",
  rendererSrcDir: "renderer",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = ["web", "es6"];
    }
    console.log("2 ", config.target, isServer);
    return config;
  },
};
