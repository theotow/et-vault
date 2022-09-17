const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
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
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15')

      // act
      const inheritors = await contract.getter(owner.address)
      const testemony = await contract.testimonies(owner.address)

      // assert
      expect(inheritors[0].inheritor).to.eq(payload[0].inheritor)
      expect(inheritors[0].share).to.eq(payload[0].share)
      expect(testemony.reportTime).to.eq(reportTime);
      expect(inheritors.length).to.eq(1)
    });

    it("should return if owner is alive", async function () {
      // arrange
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);
      const payload = [{inheritor: '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15', share: 100 }]
      const reportTime = 60 * 60 * 24 * 7
      await contract.setup(payload, reportTime, '0xeA6011Ff0d0D076C40d41EF33BC1D25FF5a52c15')
      const nowPlus8Days = Math.ceil(new Date().getTime() / 1000) + (60 * 60 * 24 * 8)
      const nowPlus6Days = Math.ceil(new Date().getTime() / 1000) + (60 * 60 * 24 * 6)

      // act
      const result6Days = await contract.ownerIsAlive(owner.address, nowPlus6Days)
      const result8Days = await contract.ownerIsAlive(owner.address, nowPlus8Days)

      // assert
      expect(result6Days).to.eq(true);
      expect(result8Days).to.eq(false);
    });
  });

});
