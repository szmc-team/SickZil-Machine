const { useBabelRc, override } = require('customize-cra')
const path = require('path')

const useCustomConfig = () => config => {
  const alias = { '~': path.resolve(__dirname, 'src/') }
  Object.assign(config.resolve.alias, alias)
  config.target = 'web'
  return config
}

module.exports = override(useCustomConfig(), useBabelRc())
