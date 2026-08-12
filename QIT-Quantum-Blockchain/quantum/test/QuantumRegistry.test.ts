import { expect } from "chai";
import { ethers } from "hardhat";

describe("QuantumRegistry Genesis v0.3", function () {

  async function deployRegistry() {
    const Registry = await ethers.getContractFactory("QuantumRegistry");
    const registry = await Registry.deploy();
    await registry.waitForDeployment();
    return registry;
  }

  it("Should set the deployer as owner", async function () {
    const [owner] = await ethers.getSigners();
    const registry = await deployRegistry();

    expect(await registry.owner()).to.equal(owner.address);
  });

  it("Should register and retrieve contract address", async function () {
    const registry = await deployRegistry();

    const registryId = ethers.encodeBytes32String("QSTATE_TOKEN");
    const fakeAddress =
      "0x0000000000000000000000000000000000000123";

    const [owner] = await ethers.getSigners();

    await registry.registerContract(
      registryId,
      fakeAddress,
      3,
      owner.address,
      owner.address,
      owner.address
    );

    expect(
      await registry.getContract(registryId)
    ).to.equal(fakeAddress);
  });

  it("Should reject unauthorized registry update", async function () {
    const [, attacker] = await ethers.getSigners();
    const registry = await deployRegistry();

    const registryId = ethers.encodeBytes32String("TREASURY");

    await expect(
      registry
        .connect(attacker)
        .registerContract(
          registryId,
          attacker.address,
          1,
          attacker.address,
          attacker.address,
          attacker.address
        )
    ).to.be.revertedWith("Not authorized");
  });

  it("Should store contract metadata", async function () {
    const registry = await deployRegistry();

    const registryId = ethers.encodeBytes32String("QSTATE_TOKEN");
    const fakeAddress =
      "0x0000000000000000000000000000000000000123";

    const [owner] = await ethers.getSigners();

    await registry.registerContract(
      registryId,
      fakeAddress,
      3,
      owner.address,
      owner.address,
      owner.address
    );

    await registry.setContractMetadata(
      registryId,
      "QSTATE Token",
      "Genesis-v0.3",
      "TOKEN",
      "QIT Quantum State Token"
    );

    const metadata =
      await registry.getContractMetadata(registryId);

    expect(metadata.name).to.equal("QSTATE Token");
    expect(metadata.version).to.equal("Genesis-v0.3");
    expect(metadata.category).to.equal("TOKEN");
    expect(metadata.description).to.equal(
      "QIT Quantum State Token"
    );
  });

  it("Should change lifecycle", async function () {
    const registry = await deployRegistry();

    const registryId = ethers.encodeBytes32String("TREASURY");
    const fakeAddress =
      "0x0000000000000000000000000000000000000123";

    const [owner] = await ethers.getSigners();

    await registry.registerContract(
      registryId,
      fakeAddress,
      1,
      owner.address,
      owner.address,
      owner.address
    );

    await registry.setLifecycle(
      registryId,
      4
    );

    const record =
      await registry.getContractRecord(registryId);

    expect(record.lifecycle).to.equal(4);
  });

  it("Should record dependency", async function () {
    const registry = await deployRegistry();

    const registryId =
      ethers.encodeBytes32String("TREASURY");

    const dependencyId =
      ethers.encodeBytes32String("REGISTRY");

    const fakeAddress =
      "0x0000000000000000000000000000000000000123";

    const [owner] = await ethers.getSigners();

    await registry.registerContract(
      registryId,
      fakeAddress,
      3,
      owner.address,
      owner.address,
      owner.address
    );

    await registry.registerContract(
      dependencyId,
      fakeAddress,
      3,
      owner.address,
      owner.address,
      owner.address
    );

    await registry.addDependency(
      registryId,
      dependencyId
    );

    const dependencies =
      await registry.getDependencies(registryId);

    expect(dependencies.length).to.equal(1);
    expect(dependencies[0]).to.equal(dependencyId);
  });

});
