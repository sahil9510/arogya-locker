require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: {
//     version: "0.8.19",
//     settings: { optimizer: { enabled: true, runs: 200 },viaIR: true },
//   },
//   networks:{
//       sepolia: {
//         url: process.env.RPC_URL,
//         accounts: ["0x"+process.env.PRIVATE_KEY]
//       }
//   }
// };

module.exports = {
  defaultNetwork: "polygon_mumbai",
  solidity: {
    version: "0.8.19",
    settings: { optimizer: { enabled: true, runs: 200 },viaIR: true },
  },
  networks:{
      polygon_mumbai: {
        url: "https://rpc-mumbai.maticvigil.com",
        accounts: ["0x"+process.env.PRIVATE_KEY]
      }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
