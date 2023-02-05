module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // global is not defined 에러로 아래의 주석 코드를 사용하여 임시로 코드작성
      // config.target = ["web", "es6"];
      config.target = "electron-renderer";
    }
    return config;
  },
};
