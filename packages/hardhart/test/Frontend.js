const {
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Frontend", function () {
  async function basicSetup() {

    // Contracts are deployed using the first signer/account by default
    const [owner, user1, user2, vault] = await ethers.getSigners();


    const Frontend = await ethers.getContractFactory("Frontend");
    const contract = await Frontend.deploy();
    const contractUser1 = contract.connect(user1)

    return {  contract, owner, user1, user2, contractUser1, vault };
  }
  const VAULT_ADDRESS = '0x6d92d66805b6e617de7513C2eA8046dF3Eb500Cf'
  const NULL = '0x0000000000000000000000000000000000000000'

  describe("Deployment", function () {
    it("should be able to setup inheritors", async function () {
      // arrange
      const { contract, owner } = await loadFixture(basicSetup);
      const payload = [{inheritor: '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15', share: 100, balanceWithdrawn: 0 }]
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, VAULT_ADDRESS)

      // act
      const inheritors = await contract.getter(owner.address)
      const testemony = await contract.ownerToTestemonies(owner.address)

      // assert
      expect(inheritors[0].inheritor).to.eq(payload[0].inheritor)
      expect(inheritors[0].share).to.eq(payload[0].share)
      expect(testemony.reportTime).to.eq(reportTime);
      expect(inheritors.length).to.eq(1)
    });

    it("should return if owner is alive", async function () {
      // arrange
      const { contract, owner } = await loadFixture(basicSetup);
      const payload = [{inheritor: '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15', share: 100, balanceWithdrawn: 0 }]
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, VAULT_ADDRESS)
      const nowPlus8Days = Math.ceil(new Date().getTime() / 1000) + (60 * 60 * 24 * 8)
      const nowPlus6Days = Math.ceil(new Date().getTime() / 1000) + (60 * 60 * 24 * 6)

      // act
      const result6Days = await contract.ownerIsAlive(owner.address, nowPlus6Days)
      const result8Days = await contract.ownerIsAlive(owner.address, nowPlus8Days)

      // assert
      expect(result6Days).to.eq(true);
      expect(result8Days).to.eq(false);
    });

    it("should error = owner still alive", async function () {
      // arrange
      const { contract, user1, user2, vault, contractUser1 } = await loadFixture(basicSetup);
      const payload = [
        {inheritor: user1.address, share: 40, balanceWithdrawn: 0 },
        {inheritor: user2.address, share: 60, balanceWithdrawn: 0 }
      ]
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, vault.address)

      // act
      const contractBalance = await ethers.provider.getBalance(vault.address)
      const percent10 = contractBalance.div(10)
      await expect(contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)).to.be.revertedWith('owner still alive');
    });

    it("should be able to cash out", async function () {
      // arrange
      const { contract, user1, user2, vault, contractUser1 } = await loadFixture(basicSetup);
      const payload = [
        {inheritor: user1.address, share: 40, balanceWithdrawn: 0 },
        {inheritor: user2.address, share: 60, balanceWithdrawn: 0 }
      ]
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, vault.address)
      await network.provider.send("evm_increaseTime", [reportTime * 2])
      await network.provider.send("evm_mine")

      // act + assert
      const contractBalance = await ethers.provider.getBalance(vault.address)
      const percent10 = contractBalance.div(10)
      await contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)
      await contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)
      await contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)
      await contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)
      await expect(contractUser1.withdrawNative(NULL, percent10, vault.address, user1.address)).to.be.revertedWith('reached limit');
    });
  });

});
