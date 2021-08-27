module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'F1 Standings';
      args[1].version = '1.3.0';
      return args;
    });
  }
};
