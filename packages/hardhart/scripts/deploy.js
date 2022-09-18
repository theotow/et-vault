// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Frontend = await hre.ethers.getContractFactory("Frontend");
  const frontend = await Frontend.deploy();
  await frontend.deployTransaction.wait(1);
  console.log('frontend', frontend.address)

  const Guard = await hre.ethers.getContractFactory("Guard");
  const guard = await Guard.deploy(frontend.address);
  await guard.deployTransaction.wait(1);
  console.log('guard', guard.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
