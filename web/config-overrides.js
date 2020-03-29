// eslint-disable-next-line import/no-extraneous-dependencies
import { useBabelRc, override } from 'customize-cra';
import { resolve } from 'path';

const useCustomConfig = () => (config) => {
  const cf = config;
  const alias = { '~': resolve(__dirname, 'src/') };
  Object.assign(config.resolve.alias, alias);
  cf.target = 'web';
  return config;
};

export default override(useCustomConfig(), useBabelRc());
