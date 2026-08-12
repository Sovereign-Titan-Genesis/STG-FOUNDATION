import { ethers } from "hardhat";

const REGISTRY_ADDRESS = "0x5A0228989eEAc801B7fc73c2919732639Df7F573";

async function main() {
  const network = await ethers.provider.getNetwork();
  const [deployer] = await ethers.getSigners();

  console.log("=== QUANTUM REGISTRY SEPOLIA HANDSHAKE ===");
  console.log("Chain ID :", network.chainId.toString());
  console.log("Registry :", REGISTRY_ADDRESS);
  console.log("Deployer :", deployer.address);

  if (network.chainId !== 11155111n) {
    throw new Error(`Wrong network: expected Sepolia 11155111, got ${network.chainId}`);
  }

  const registry = await ethers.getContractAt(
    "QuantumRegistry",
    REGISTRY_ADDRESS
  );

  const owner = await registry.owner();

  console.log("Owner    :", owner);

  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error("Owner mismatch");
  }

  console.log("\n[1] REGISTER");

  const registryId = ethers.keccak256(
    ethers.toUtf8Bytes("QIT.QSTATE.TOKEN.GENESIS.V0.3")
  );

  const tx1 = await registry.registerContract(
    registryId,
    "0x0000000000000000000000000000000000000123",
    1,
    deployer.address,
    deployer.address,
    deployer.address
  );

  await tx1.wait();

  console.log("REGISTER: OK");

  console.log("\n[2] READ CONTRACT");

  const stored = await registry.getContract(registryId);

  console.log("Stored   :", stored);

  if (
    stored.toLowerCase() !==
    "0x0000000000000000000000000000000000000123"
  ) {
    throw new Error("Stored contract mismatch");
  }

  console.log("READ: OK");

  console.log("\n[3] METADATA");

  const tx2 = await registry.setContractMetadata(
    registryId,
    "QSTATE Token",
    "Genesis-v0.3",
    "TOKEN",
    "QIT QSTATE Genesis Token"
  );

  await tx2.wait();

  const metadata = await registry.getContractMetadata(registryId);

  console.log("Name     :", metadata.name);
  console.log("Version  :", metadata.version);
  console.log("Category :", metadata.category);
  console.log("Metadata : OK");

  console.log("\n[4] LIFECYCLE");

  const tx3 = await registry.setLifecycle(registryId, 4);
  await tx3.wait();

  const record = await registry.getContractRecord(registryId);

  console.log("Lifecycle:", record.lifecycle.toString());
  console.log("Lifecycle: OK");

  console.log("\n[5] AUDIT TRAIL");

  const audit = await registry.getAuditTrail(registryId);

  console.log("Entries  :", audit.length);

  if (audit.length < 3) {
    throw new Error("Audit trail incomplete");
  }

  console.log("Audit    : OK");

  console.log("\n=== SEPOLIA HANDSHAKE SUCCESS ===");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
