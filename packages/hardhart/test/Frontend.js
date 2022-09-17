const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Frontend", function () {
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Frontend = await ethers.getContractFactory("Frontend");
    const contract = await Frontend.deploy();

    return {  contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("should be able to setup inheritors", async function () {
      // arrange
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);
      const payload = [{inheritor: '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15', share: 100 }]
      await contract.setup(payload)

      // act
      const result = await contract.getter(owner.address)

      // assert
      expect(result[0].inheritor).to.eq(payload[0].inheritor)
      expect(result[0].share).to.eq(payload[0].share)
      expect(result.length).to.eq(1)
    });
  });

});
