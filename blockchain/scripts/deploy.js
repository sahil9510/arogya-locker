// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const contract = await hre.ethers.deployContract("Account",["0xB2b5841DBeF766d4b521221732F9B618fCf34A87"]);
  await contract.waitForDeployment();
  console.log("Contract Address: ",contract.target);

  // const contract = await hre.ethers.deployContract("AcceptEverythingPaymaster");
  // await contract.waitForDeployment();
  // console.log("Contract Address: ",contract.target);

  // const contract = await hre.ethers.deployContract("AccountCaller",["0x988A9CE40AEE61719954feB6Fd59728A9a9476d0"]);
  // await contract.waitForDeployment();
  // console.log("Contract Address: ",contract.target);
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  // const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
