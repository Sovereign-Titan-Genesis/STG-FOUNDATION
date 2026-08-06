import { expect } from "chai";
import { ethers } from "hardhat";

describe("QuantumRegistry Genesis v0.2", function () { 

  it("Should set the deployer as owner", async function () {

    const [owner] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory(
      "QuantumRegistry"
    );

    const registry = await Registry.deploy();

    await registry.waitForDeployment();

    expect(await registry.owner())
      .to.equal(owner.address);
  });


  it("Should register and retrieve contract address", async function () {

    const Registry = await ethers.getContractFactory(
      "QuantumRegistry"
    );

    const registry = await Registry.deploy();

    await registry.waitForDeployment();


    const contractName =
      ethers.encodeBytes32String("QSTATE_TOKEN");


    const fakeAddress =
      "0x0000000000000000000000000000000000000123";


    await registry.registerContract(
      contractName,
      fakeAddress,
  "Genesis-v0.2"
    );


    expect(
      await registry.getContract(contractName)
    ).to.equal(fakeAddress);

  });


  it("Should reject unauthorized registry update", async function () {

    const [, attacker] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory(
      "QuantumRegistry"
    );

    const registry = await Registry.deploy();

    await registry.waitForDeployment();


    const contractName =
      ethers.encodeBytes32String("TREASURY");


    await expect(
      registry
      .connect(attacker)
      .registerContract(
        contractName,
        attacker.address,
  "v0.2"
      )
    ).to.be.revertedWith(
      "Not authorized"
    );

  });

});
it("Should store contract metadata", async function () {

  const Registry = await ethers.getContractFactory(
    "QuantumRegistry"
  );

  const registry = await Registry.deploy();

  await registry.waitForDeployment();

  const name =
    ethers.encodeBytes32String("QSTATE_TOKEN");

  const address =
    "0x0000000000000000000000000000000000000123";

  await registry.registerContract(
    name,
    address,
    "Genesis-v0.2"
  );

  const info =
    await registry.getContractInfo(name);

  expect(info.contractAddress)
    .to.equal(address);

  expect(info.version)
    .to.equal("Genesis-v0.2");

  expect(info.active)
    .to.equal(true);

});
