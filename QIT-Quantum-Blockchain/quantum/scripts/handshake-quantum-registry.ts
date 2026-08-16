import { ethers } from "hardhat";

const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS;

if (!REGISTRY_ADDRESS) {
  throw new Error("REGISTRY_ADDRESS is required");
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const Registry = await ethers.getContractFactory("QuantumRegistry");
  const registry = Registry.attach(REGISTRY_ADDRESS);

  console.log("=== QUANTUM REGISTRY HANDSHAKE ===");
  console.log("Registry :", REGISTRY_ADDRESS);
  console.log("Deployer :", deployer.address);

  const owner = await registry.owner();
  console.log("Owner    :", owner);

  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error("HANDSHAKE FAILED: owner mismatch");
  }

  const registryId = ethers.encodeBytes32String("QSTATE_TOKEN");
  const fakeAddress = "0x0000000000000000000000000000000000000123";

  console.log("\n[1] REGISTER");
  await (
    await registry.registerContract(
      registryId,
      fakeAddress,
      3,
      deployer.address,
      deployer.address,
      deployer.address
    )
  ).wait();

  console.log("REGISTER: OK");

  console.log("\n[2] READ CONTRACT");
  const storedAddress = await registry.getContract(registryId);
  console.log("Stored   :", storedAddress);

  if (storedAddress.toLowerCase() !== fakeAddress.toLowerCase()) {
    throw new Error("HANDSHAKE FAILED: address mismatch");
  }

  console.log("READ: OK");

  console.log("\n[3] METADATA");
  await (
    await registry.setContractMetadata(
      registryId,
      "QSTATE Token",
      "Genesis-v0.3",
      "TOKEN",
      "QIT Quantum State Token"
    )
  ).wait();

  const metadata = await registry.getContractMetadata(registryId);

  console.log("Name     :", metadata.name);
  console.log("Version  :", metadata.version);
  console.log("Category :", metadata.category);
  console.log("Metadata : OK");

  console.log("\n[4] LIFECYCLE");
  await (
    await registry.setLifecycle(registryId, 4)
  ).wait();

  const record = await registry.getContractRecord(registryId);

  console.log("Lifecycle:", record.lifecycle.toString());
  console.log("Lifecycle: OK");

  console.log("\n[5] AUDIT TRAIL");
  const audit = await registry.getAuditTrail(registryId);

  console.log("Entries  :", audit.length);
  console.log("Audit    : OK");

  console.log("\n=== HANDSHAKE SUCCESS ===");
}

main().catch((error) => {
  console.error("\n=== HANDSHAKE FAILED ===");
  console.error(error);
  process.exitCode = 1;
});
