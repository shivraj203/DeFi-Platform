import { DefiPlatform } from './../typechain/DefiPlatform.d';
import { Governance } from './../typechain/Governance.d';
import { UpgradToken } from './../typechain/UpgradToken.d';
import {ethers, upgrades} from "hardhat";
import { error } from 'console';

async function main() {
    const totalSupply = 10000000;
    const tokenName = "GradCoin";
    const tokenDecimals = 0;
    const tokenSymbol = "GRAD";

    // 1. Deploy Upgrad Token
    const UpgradToken =  await ethers.getContractFactory("UpgradToken");
    const upgradtoken = await UpgradToken.deploy(totalSupply, tokenName, tokenDecimals, tokenSymbol);
     
    await upgradtoken.deployed();
    console.log("Upgrad Token Deployment Successful at:" + upgradtoken.address);

    const flaggingThreshold = 5;

    // 2. Deploy Governence
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await upgrades.deployProxy(Governance, [flaggingThreshold]);

    await governance.deployed();
    console.log("Governence Deployment Successful at:" + governance.address);

    // 3. Deploy Defi Platform
    const DefiPlatform = await ethers.getContractFactory("DefiPlatform");
    const defiplatform = await DefiPlatform.deploy(governance.address);

    await defiplatform.deployed();
    console.log("DeFi Platform Deployment Successful at:" + defiplatform.address);
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});