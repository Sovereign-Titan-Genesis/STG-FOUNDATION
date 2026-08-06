// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QStateToken is ERC20, Ownable {

    address public treasury;
    address public quantumRegistry;

    event TreasuryUpdated(address indexed treasury);
    event QuantumRegistryUpdated(address indexed registry);

    constructor(
        address _treasury,
        address _registry,
        uint256 initialSupply
    )
        ERC20("QState Sovereign Quantum Token", "QSTATE")
        Ownable(msg.sender)
    {
        treasury = _treasury;
        quantumRegistry = _registry;

        _mint(msg.sender, initialSupply);
    }

    function setTreasury(address _treasury)
        external
        onlyOwner
    {
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setQuantumRegistry(address _registry)
        external
        onlyOwner
    {
        quantumRegistry = _registry;
        emit QuantumRegistryUpdated(_registry);
    }
}
