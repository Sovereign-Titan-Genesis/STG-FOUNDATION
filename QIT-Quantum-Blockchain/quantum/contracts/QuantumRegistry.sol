// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title QuantumRegistry
 * @notice Genesis Master Registry with Contract Metadata
 * @dev QIT Quantum Blockchain Foundation Registry
 */
contract QuantumRegistry {

    address public owner;

    struct ContractInfo {
        address contractAddress;
        string version;
        bool active;
        uint256 registeredAt;
    }

    mapping(bytes32 => ContractInfo) private registry;


    event ContractRegistered(
        bytes32 indexed name,
        address indexed contractAddress,
        string version
    );


    event ContractStatusChanged(
        bytes32 indexed name,
        bool active
    );


    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );


    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Not authorized"
        );
        _;
    }


    constructor() {
        owner = msg.sender;
    }


    /**
     * @notice Register or update Genesis contract metadata
     */
    function registerContract(
        bytes32 name,
        address contractAddress,
        string memory version
    )
        external
        onlyOwner
    {
        require(
            contractAddress != address(0),
            "Invalid address"
        );


        registry[name] = ContractInfo({
            contractAddress: contractAddress,
            version: version,
            active: true,
            registeredAt: block.timestamp
        });


        emit ContractRegistered(
            name,
            contractAddress,
            version
        );
    }


    /**
     * @notice Retrieve contract address
     */
    function getContract(
        bytes32 name
    )
        external
        view
        returns(address)
    {
        return registry[name].contractAddress;
    }


    /**
     * @notice Retrieve full metadata
     */
    function getContractInfo(
        bytes32 name
    )
        external
        view
        returns(
            address contractAddress,
            string memory version,
            bool active,
            uint256 registeredAt
        )
    {
        ContractInfo memory info = registry[name];

        return (
            info.contractAddress,
            info.version,
            info.active,
            info.registeredAt
        );
    }


    /**
     * @notice Enable or disable registered contract
     */
    function setContractStatus(
        bytes32 name,
        bool status
    )
        external
        onlyOwner
    {
        registry[name].active = status;

        emit ContractStatusChanged(
            name,
            status
        );
    }


    function transferOwnership(
        address newOwner
    )
        external
        onlyOwner
    {
        require(
            newOwner != address(0),
            "Invalid owner"
        );

        emit OwnershipTransferred(
            owner,
            newOwner
        );

        owner = newOwner;
    }
}
