 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title QuantumRegistry
 * @notice Genesis Master Registry for QIT Quantum Blockchain
 * @dev Stores contract identity, metadata, lifecycle, governance,
 *      dependencies and auditable change history.
 */
contract QuantumRegistry {

    address public owner;

    enum Lifecycle {
        DRAFT,
        DEVELOPMENT,
        TESTNET,
        GENESIS,
        ACTIVE,
        MIGRATED,
        ARCHIVED
    }

    struct ContractRecord {
        bytes32 registryId;
        address contractAddress;
        Lifecycle lifecycle;
        address owner;
        address controller;
        address upgradeAuthority;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct ContractMetadata {
        string name;
        string version;
        string category;
        string description;
    }

    struct AuditEntry {
        bytes32 registryId;
        address actor;
        bytes32 action;
        bytes32 reason;
        uint256 timestamp;
    }

    mapping(bytes32 => ContractRecord) private registry;
    mapping(bytes32 => ContractMetadata) private metadata;
    mapping(bytes32 => bytes32[]) private dependencies;
    mapping(bytes32 => AuditEntry[]) private auditTrail;

    event ContractRegistered(
        bytes32 indexed registryId,
        address indexed contractAddress,
        Lifecycle lifecycle,
        uint256 timestamp
    );

    event MetadataUpdated(
        bytes32 indexed registryId,
        uint256 timestamp
    );

    event LifecycleChanged(
        bytes32 indexed registryId,
        Lifecycle previousLifecycle,
        Lifecycle newLifecycle,
        uint256 timestamp
    );

    event GovernanceUpdated(
        bytes32 indexed registryId,
        address contractOwner,
        address controller,
        address upgradeAuthority,
        uint256 timestamp
    );

    event DependencyAdded(
        bytes32 indexed registryId,
        bytes32 indexed dependencyRegistryId
    );

    event AuditRecorded(
        bytes32 indexed registryId,
        address indexed actor,
        bytes32 action,
        bytes32 reason,
        uint256 timestamp
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

    function registerContract(
        bytes32 registryId,
        address contractAddress,
        Lifecycle lifecycle,
        address contractOwner,
        address controller,
        address upgradeAuthority
    ) external onlyOwner {
        require(
            registryId != bytes32(0),
            "Invalid registry ID"
        );

        require(
            contractAddress != address(0),
            "Invalid address"
        );

        require(
            registry[registryId].createdAt == 0,
            "Registry ID already exists"
        );

        uint256 timestamp = block.timestamp;

        registry[registryId] = ContractRecord({
            registryId: registryId,
            contractAddress: contractAddress,
            lifecycle: lifecycle,
            owner: contractOwner,
            controller: controller,
            upgradeAuthority: upgradeAuthority,
            createdAt: timestamp,
            updatedAt: timestamp
        });

        _recordAudit(
            registryId,
            keccak256("CONTRACT_REGISTERED"),
            keccak256("GENESIS_REGISTRATION")
        );

        emit ContractRegistered(
            registryId,
            contractAddress,
            lifecycle,
            timestamp
        );
    }

    function setContractMetadata(
        bytes32 registryId,
        string calldata name,
        string calldata version,
        string calldata category,
        string calldata description
    ) external onlyOwner {
        require(
            registry[registryId].createdAt != 0,
            "Registry ID not found"
        );

        metadata[registryId] = ContractMetadata({
            name: name,
            version: version,
            category: category,
            description: description
        });

        registry[registryId].updatedAt = block.timestamp;

        _recordAudit(
            registryId,
            keccak256("METADATA_UPDATED"),
            keccak256("METADATA_UPDATE")
        );

        emit MetadataUpdated(
            registryId,
            block.timestamp
        );
    }

    function setLifecycle(
        bytes32 registryId,
        Lifecycle newLifecycle
    ) external onlyOwner {
        ContractRecord storage record = registry[registryId];

        require(
            record.createdAt != 0,
            "Registry ID not found"
        );

        Lifecycle previousLifecycle = record.lifecycle;

        record.lifecycle = newLifecycle;
        record.updatedAt = block.timestamp;

        _recordAudit(
            registryId,
            keccak256("LIFECYCLE_CHANGED"),
            keccak256("STATE_TRANSITION")
        );

        emit LifecycleChanged(
            registryId,
            previousLifecycle,
            newLifecycle,
            block.timestamp
        );
    }

    function setGovernance(
        bytes32 registryId,
        address contractOwner,
        address controller,
        address upgradeAuthority
    ) external onlyOwner {
        ContractRecord storage record = registry[registryId];

        require(
            record.createdAt != 0,
            "Registry ID not found"
        );

        record.owner = contractOwner;
        record.controller = controller;
        record.upgradeAuthority = upgradeAuthority;
        record.updatedAt = block.timestamp;

        _recordAudit(
            registryId,
            keccak256("GOVERNANCE_UPDATED"),
            keccak256("AUTHORITY_UPDATE")
        );

        emit GovernanceUpdated(
            registryId,
            contractOwner,
            controller,
            upgradeAuthority,
            block.timestamp
        );
    }

    function addDependency(
        bytes32 registryId,
        bytes32 dependencyRegistryId
    ) external onlyOwner {
        require(
            registry[registryId].createdAt != 0,
            "Registry ID not found"
        );

        require(
            registry[dependencyRegistryId].createdAt != 0,
            "Dependency not found"
        );

        require(
            registryId != dependencyRegistryId,
            "Self dependency"
        );

        dependencies[registryId].push(dependencyRegistryId);

        registry[registryId].updatedAt = block.timestamp;

        _recordAudit(
            registryId,
            keccak256("DEPENDENCY_ADDED"),
            dependencyRegistryId
        );

        emit DependencyAdded(
            registryId,
            dependencyRegistryId
        );
    }

    function getContract(
        bytes32 registryId
    ) external view returns (address) {
        return registry[registryId].contractAddress;
    }

    function getContractRecord(
        bytes32 registryId
    )
        external
        view
        returns (ContractRecord memory)
    {
        require(
            registry[registryId].createdAt != 0,
            "Registry ID not found"
        );

        return registry[registryId];
    }

    function getContractMetadata(
        bytes32 registryId
    )
        external
        view
        returns (ContractMetadata memory)
    {
        require(
            registry[registryId].createdAt != 0,
            "Registry ID not found"
        );

        return metadata[registryId];
    }

    function getDependencies(
        bytes32 registryId
    )
        external
        view
        returns (bytes32[] memory)
    {
        return dependencies[registryId];
    }

    function getAuditTrail(
        bytes32 registryId
    )
        external
        view
        returns (AuditEntry[] memory)
    {
        return auditTrail[registryId];
    }

    function _recordAudit(
        bytes32 registryId,
        bytes32 action,
        bytes32 reason
    ) internal {
        auditTrail[registryId].push(
            AuditEntry({
                registryId: registryId,
                actor: msg.sender,
                action: action,
                reason: reason,
                timestamp: block.timestamp
            })
        );

        emit AuditRecorded(
            registryId,
            msg.sender,
            action,
            reason,
            block.timestamp
        );
    }

    function transferOwnership(
        address newOwner
    ) external onlyOwner {
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
