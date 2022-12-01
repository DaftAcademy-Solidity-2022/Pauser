
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Pauser", () => {

    // contract
    let sut

    // accounts
    let alice
    let bob

    beforeEach(async () => {
        [alice, bob] = await ethers.getSigners()
        const Pauser = await ethers.getContractFactory("Pauser")
        sut = await Pauser.deploy()
    })

    it('should deploy correctly', async () => {
        await expect(sut.address).to.be.properAddress
    })

    it('should save alice as owner', async () => {
        expect(await sut.owner()).to.equal(alice.address)
    })

    it('should not be paused by default', async () => {
        await expect(await sut.isPaused()).to.equal(false)
    })

    it('should allow owner to pause', async () => {
        await expect(sut.pause()).not.to.be.reverted
    })

    it('should not allow owner to unpause', async () => {
      await expect(sut.unpause()).to.be.reverted
    })

    it('should not allow other people to pause', async () => {
        await expect(sut.connect(bob).pause()).to.be.reverted
    })

    context('when paused', async () => {

        beforeEach(async () => {
            await sut.pause()
        })

        it('should be paused', async () => {
            await expect(await sut.isPaused()).to.equal(true)
        })

        it('should allow owner to unpause', async () => {
            await expect(sut.unpause()).not.to.be.reverted
        })
    
        it('should not allow other people to unpause', async () => {
            await expect(sut.connect(bob).unpause()).to.be.reverted
        })

        it('should not be able to pause again', async () => {
            await expect(sut.pause()).to.be.reverted
        })

        context('when unpaused', async () => {

            beforeEach(async () => {
                await sut.unpause()
            })
    
            it('should not be paused', async () => {
                await expect(await sut.isPaused()).to.equal(false)
            })

            it('should not be able to unpause again', async () => {
                await expect(sut.unpause()).to.be.reverted
            })
    
        })
    })

})
