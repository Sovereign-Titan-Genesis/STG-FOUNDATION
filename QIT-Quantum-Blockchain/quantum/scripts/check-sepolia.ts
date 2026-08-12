import { ethers } from "hardhat";

async function main() {
  const network = await ethers.provider.getNetwork();
  const [signer] = await ethers.getSigners();

  console.log("=== SEPOLIA CONNECTIVITY CHECK ===");
  console.log("Chain ID :", network.chainId.toString());
  console.log("Signer   :", signer.address);

  const balance = await ethers.provider.getBalance(signer.address);

  console.log("Balance  :", ethers.formatEther(balance), "ETH");

  if (network.chainId !== 11155111n) {
    throw new Error(
      `Wrong network: expected Sepolia 11155111, got ${network.chainId}`
    );
  }

  console.log("NETWORK : OK");
  console.log("RPC     : OK");
  console.log("WALLET  : OK");
  console.log("=== SEPOLIA CONNECTIVITY SUCCESS ===");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
