// eslint-disable-next-line import/no-extraneous-dependencies
const { useBabelRc, override } = require('customize-cra');
const path = require('path');

const useCustomConfig = () => (config) => {
  const cf = config;
  const alias = { '~': path.resolve(__dirname, 'src/') };
  Object.assign(config.resolve.alias, alias);
  cf.target = 'web';
  return config;
};

module.exports = override(useCustomConfig(), useBabelRc());
