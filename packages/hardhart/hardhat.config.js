require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-abi-exporter');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  },
  abiExporter: [
    {
      path: '../frontend/src/abi',
      only: ['^contract'],
      pretty: true,
      runOnCompile: true
    },
  ]
};
