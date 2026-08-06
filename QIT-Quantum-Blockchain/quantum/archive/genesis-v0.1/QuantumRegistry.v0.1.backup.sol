// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title QuantumRegistry
 * @notice Genesis Master Registry for QIT Quantum Blockchain
 * @dev Stores official addresses of Genesis ecosystem contracts
 */
contract QuantumRegistry {

    address public owner;

    mapping(bytes32 => address) private registry;

    event ContractRegistered(
        bytes32 indexed name,
        address indexed contractAddress
    );

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Register official Genesis contract address
     */
    function registerContract(
        bytes32 name,
        address contractAddress
    )
        external
        onlyOwner
    {
        require(contractAddress != address(0), "Invalid address");

        registry[name] = contractAddress;

        emit ContractRegistered(
            name,
            contractAddress
        );
    }

    /**
     * @notice Read registered contract address
     */
    function getContract(
        bytes32 name
    )
        external
        view
        returns(address)
    {
        return registry[name];
    }

    /**
     * @notice Transfer Genesis ownership
     */
    function transferOwnership(
        address newOwner
    )
        external
        onlyOwner
    {
        require(newOwner != address(0), "Invalid owner");

        emit OwnershipTransferred(
            owner,
            newOwner
        );

        owner = newOwner;
    }
}
