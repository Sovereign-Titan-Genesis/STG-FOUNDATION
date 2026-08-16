QReg Local Verification Record — 2026-08-16

1. Verification Scope

This record documents the successful local verification of QuantumRegistry v0.3 prior to Sepolia progression.

Verification path:

"Compile → Unit Test → Local Node → Local Deployment → Local Handshake"

2. Source Baseline

Repository:

"STG-FOUNDATION/QIT-Quantum-Blockchain/quantum"

Contract:

"contracts/QuantumRegistry.sol"

Solidity:

"0.8.28"

Test:

"test/QuantumRegistry.test.ts"

3. Compile Result

Command:

"npx hardhat compile"

Result:

"Nothing to compile"

Interpretation:

The current Solidity source has no newer changes requiring recompilation.

4. Unit Test Result

Command:

"npx hardhat test"

Result:

"6 passing (6s)"

Verified behaviors:

1. Deployer is initialized as owner.
2. Contract registration and address retrieval succeed.
3. Unauthorized registry update is rejected.
4. Contract metadata is stored and retrieved.
5. Lifecycle transition succeeds.
6. Dependency recording succeeds.

5. Local Runtime

Local node:

"Hardhat Network"

RPC:

"http://127.0.0.1:8545/"

Observed Chain ID:

"31337"

6. Local Deployment

Deployment script:

"scripts/deploy-quantum-registry.ts"

Deployment result:

"=== DEPLOYMENT SUCCESS ==="

Registry:

"0x5FbDB2315678afecb367f032d93F642f64180aa3"

Deployer:

"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

Owner:

"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

Ownership verification:

"Deployer == Owner"

Status:

"PASS"

7. Local Handshake

Handshake script:

"scripts/handshake-quantum-registry.ts"

Registry:

"0x5FbDB2315678afecb367f032d93F642f64180aa3"

Registry ID:

"QSTATE_TOKEN"

Test address:

"0x0000000000000000000000000000000000000123"

The test address is a dummy local address and does not represent a deployed production contract.

Registration

"REGISTER: OK"

Read-back

Stored address:

"0x0000000000000000000000000000000000000123"

"READ: OK"

Metadata

Name:

"QSTATE Token"

Version:

"Genesis-v0.3"

Category:

"TOKEN"

Description:

"QIT Quantum State Token"

"Metadata: OK"

Lifecycle

Observed lifecycle value:

"4"

"Lifecycle: OK"

Audit Trail

Observed entries:

"3"

"Audit: OK"

Final result:

"=== LOCAL HANDSHAKE SUCCESS ==="

8. Verification Conclusion

QuantumRegistry v0.3 has successfully passed the current LOCAL verification stage.

Status:

LOCAL VERIFICATION — CLEARED

The following layers have been demonstrated:

"Source"
→ "Compile"
→ "Unit Tests"
→ "Runtime"
→ "Deployment"
→ "Ownership"
→ "Registration"
→ "Read-back"
→ "Metadata"
→ "Lifecycle"
→ "Audit Trail"

9. Boundary

This record does not constitute Sepolia or Mainnet verification.

The local registry address:

"0x5FbDB2315678afecb367f032d93F642f64180aa3"

must not be treated as a Sepolia/Mainnet deployment address.

No real ETH was required for this LOCAL verification.

10. Next Waypoint

Next target:

QREG VERIFIABILITY → SEPOLIA

Before progression:

- preserve this evidence record;
- verify repository state;
- identify which untracked scripts are intentional evidence tooling;
- confirm Sepolia RPC and deployment configuration;
- perform Sepolia deployment only after the LOCAL baseline remains clean.

Principle: QSTATE remains a historical/legacy asset; QREG remains the current master-registry project.
