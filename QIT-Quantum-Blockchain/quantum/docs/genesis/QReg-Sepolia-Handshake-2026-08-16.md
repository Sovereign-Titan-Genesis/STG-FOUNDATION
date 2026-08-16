# QReg Sepolia Handshake Record — 2026-08-16

## 1. Verification Scope

This record documents the successful runtime handshake of QuantumRegistry v0.3 on the Sepolia test network.

Verification path:

Deployment → Ownership → Registration → Read-back → Metadata → Lifecycle → Audit Trail

## 2. Network

Network: Sepolia

Chain ID: 11155111

## 3. QuantumRegistry

Registry:

0x85133EE09c43f54ad4813B2866D55C91E0e0CBE2

## 4. Deployer / Owner

Deployer:

0x4fDDddff01842373E09a769208D9936BfeCd3DE6

Owner:

0x4fDDddff01842373E09a769208D9936BfeCd3DE6

Ownership verification:

Deployer == Owner

Status:

PASS

## 5. Registry Registration

Registry ID:

QSTATE_TOKEN

Registered test address:

0x0000000000000000000000000000000000000123

Result:

REGISTER: OK

## 6. Read-back Verification

Stored address:

0x0000000000000000000000000000000000000123

Result:

READ: OK

## 7. Contract Metadata

Name:

QSTATE Token

Version:

Genesis-v0.3

Category:

TOKEN

Description:

QIT Quantum State Token

Result:

Metadata: OK

## 8. Lifecycle

Observed lifecycle:

4

Result:

Lifecycle: OK

## 9. Audit Trail

Observed audit entries:

3

Result:

Audit: OK

## 10. Handshake Result

Observed result:

=== LOCAL HANDSHAKE SUCCESS ===

Note:

The handshake script retains legacy LOCAL wording in its console output. The actual execution was performed against the Sepolia network using:

npx hardhat run scripts/handshake-quantum-registry.ts --network sepolia

with REGISTRY_ADDRESS set to the Sepolia QuantumRegistry deployment.

Therefore this record identifies the execution environment by the actual network and Chain ID rather than the legacy console label.

## 11. Verification Conclusion

QuantumRegistry v0.3 successfully completed the runtime handshake on Sepolia.

Status:

SEPOLIA HANDSHAKE — CLEARED

Verified capabilities:

- Ownership read-back
- Contract registration
- Contract address read-back
- Metadata storage and retrieval
- Lifecycle transition
- Audit trail generation

## 12. Verification Boundary

This record establishes Sepolia testnet verifiability.

It does not constitute Mainnet deployment, Mainnet verification, production governance activation, or production security certification.

## 13. Next Waypoint

Preserve this evidence record.

Then clean up the handshake script's legacy LOCAL console labels and review the resulting diff before committing the change.
