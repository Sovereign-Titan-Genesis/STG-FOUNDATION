Waypoint 05 — AB Test / Handshake Evidence v0.1

Purpose

This document records the read-only AB Test / Handshake verification performed against the frozen QuantumRegistry Genesis-v0.3 deployment on Sepolia.

This verification does not constitute an economic token transaction.

The purpose is to demonstrate that an existing registry identity can be resolved, read, and independently verified through contract state, metadata, lifecycle state, and audit evidence before any subsequent machine-to-machine interaction.

Network

- Network: Sepolia
- Chain ID: 11155111
- QuantumRegistry:
  "0x5A0228989eEAc801B7fc73c2919732639Df7F573"

Registry Identity

The registry identity was deterministically derived from:

"QIT.QSTATE.TOKEN.GENESIS.V0.3"

Registry ID:

"0x808462754245c5ea5371a10986df714aa4876db664bb8bc8209ffec934a3ef78"

The registry ID is a "bytes32" identifier and is distinct from the registered contract address.

Read-Only Contract Resolution

Registry lookup:

"getContract(registryId)"

Result:

"0x0000000000000000000000000000000000000123"

No state-changing transaction was performed for this read.

Metadata Verification

"getContractMetadata(registryId)" returned:

- Name: QSTATE Token
- Version: Genesis-v0.3
- Category: TOKEN
- Description: QIT QSTATE Genesis Token

Lifecycle / State Verification

"getContractRecord(registryId)" returned:

- Registry ID:
  "0x808462754245c5ea5371a10986df714aa4876db664bb8bc8209ffec934a3ef78"
- Registered contract:
  "0x0000000000000000000000000000000000000123"
- Lifecycle: "4"
- Governance / associated addresses:
  "0x4fDDddff01842373E09a769208D9936BfeCd3DE6"
- Created timestamp: "1786571928"
- Updated timestamp: "1786571952"

Lifecycle "4" corresponds to "ACTIVE" according to the QuantumRegistry handshake implementation/evidence.

Audit Verification

"getAuditTrail(registryId)" returned:

"3" audit entries.

All three entries referenced the same registry ID:

"0x808462754245c5ea5371a10986df714aa4876db664bb8bc8209ffec934a3ef78"

The actor recorded in the returned entries was:

"0x4fDDddff01842373E09a769208D9936BfeCd3DE6"

The returned audit entries contained distinct evidence hashes and timestamps, confirming that the registry maintains an auditable history for the registered identity.

Verification Model

The successful read-only verification establishes the following sequence:

IDENTIFY
→ RESOLVE
→ READ STATE
→ READ METADATA
→ READ AUDIT
→ VERIFY
→ DECIDE

This is intentionally different from an economic transaction flow.

The test does not claim that a token transfer occurred.

It demonstrates that an interacting machine or system can establish the identity and current registered state of another system before initiating a subsequent state-changing interaction.

Transaction Safety

During this verification phase:

- No token transfer was executed.
- No ETH transfer was executed.
- No "registerContract()" transaction was executed.
- No "setContractMetadata()" transaction was executed.
- No "setLifecycle()" transaction was executed.
- No new economic transaction was required.
- Registry reads were performed through read-only calls.

Provenance

The original Sepolia handshake implementation is recorded in:

"scripts/handshake-quantum-registry-sepolia.ts"

The original deployment evidence is recorded in:

"docs/genesis/QuantumRegistry-v0.3-sepolia.md"

The previous evidence freeze is recorded in:

"docs/genesis/EVIDENCE-FREEZE-v0.1.md"

Git baseline at the time of this verification:

- Branch: "main"
- Commit:
  "1b8ac6d" — "docs: freeze QuantumRegistry Sepolia evidence"
- Repository state before this new evidence artifact: CLEAN
- "origin/main": synchronized

Evidence Boundary

This document freezes the observed read-only state described above.

Any future change to the QuantumRegistry deployment, registered record, metadata, lifecycle, audit trail, or verification methodology must produce a new evidence artifact rather than silently modifying this historical record.

Future network deployments must have independent evidence records.

In particular, evidence for:

- QSTATE on Arbitrum
- AKSA on BNB Smart Chain
- SPOV on Sepolia

must not be inferred from this Sepolia QuantumRegistry evidence.

Each deployment must have its own chain-specific identity, transaction/deployment evidence, verification evidence, state evidence, and evidence hash.

Waypoint Status

WAYPOINT 05 — AB TEST / HANDSHAKE

READ-ONLY IDENTITY / STATE / EVIDENCE VERIFICATION:

CLEARED

This artifact is evidence of verification, not authorization for Mainnet deployment.
