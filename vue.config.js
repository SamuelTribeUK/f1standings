module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "F1 Standings";
      return args;
    });
  },
};
