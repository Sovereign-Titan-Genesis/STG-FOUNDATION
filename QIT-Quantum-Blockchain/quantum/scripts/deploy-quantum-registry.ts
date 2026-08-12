import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    const network = await ethers.provider.getNetwork();

    console.log("=== QUANTUM REGISTRY LOCAL DEPLOYMENT ===");
    console.log("Chain ID :", network.chainId.toString());
    console.log("Deployer :", deployer.address);

    const Registry = await ethers.getContractFactory("QuantumRegistry");
    const registry = await Registry.deploy();

    await registry.waitForDeployment();

    const address = await registry.getAddress();
    const owner = await registry.owner();

    console.log("Registry :", address);
    console.log("Owner    :", owner);

    console.log("=== DEPLOYMENT SUCCESS ===");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
