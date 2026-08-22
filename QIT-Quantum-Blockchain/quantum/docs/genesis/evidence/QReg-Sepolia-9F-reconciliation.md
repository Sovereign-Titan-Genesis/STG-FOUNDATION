# Q-Reg Sepolia Evidence Reconciliation — PRO STEP 9F

## Network

- Chain ID: 11155111
- Network: Sepolia
- Registry: `0x5A0228989eEAc801B7fc73c2919732639Df7F573`
- Registry ID: `0x808462754245c5ea5371a10986df714aa4876db664bb8bc8209ffec934a3ef78`

## Registered Contract

- Contract address: `0x0000000000000000000000000000000000000123`
- Lifecycle: `4`
- Owner: `0x4fDDddff01842373E09a769208D9936BfeCd3DE6`
- Controller: `0x4fDDddff01842373E09a769208D9936BfeCd3DE6`
- Upgrade authority: `0x4fDDddff01842373E09a769208D9936BfeCd3DE6`

## Metadata

- Name: `QSTATE Token`
- Version: `Genesis-v0.3`
- Category: `TOKEN`
- Description: `QIT QSTATE Genesis Token`

## Audit Transactions

### Audit #0

- TX: `0xf9dfbaee4073b1af58b0fa86e0ef9bc9a9b37662a2f4f1a37a6c8f86d96aaa38`
- Block: `11475971`
- Status: `1`
- Timestamp: `1786571928`

### Audit #1

- TX: `0x1483819752ed3ca74774abb8b9bea87fd96bdd2a510f2bac2fea133e954d8d04`
- Block: `11475972`
- Status: `1`
- Timestamp: `1786571940`

### Audit #2

- TX: `0xc775c671a479ae8a88aa8722863d5b3f6854ed8770a1af84b47c00cea892f210`
- Block: `11475973`
- Status: `1`
- Timestamp: `1786571952`

## Reconciliation

- Event audit entries: PASS
- Stored audit entries: PASS
- Registry ID consistency: PASS
- Actor consistency: PASS
- Timestamp consistency: PASS
- createdAt == first audit timestamp: PASS
- updatedAt == last audit timestamp: PASS
- Metadata raw-call decoding: PASS
- Contract record raw-call decoding: PASS
- RPC connectivity: PASS

## Scope Boundary

This evidence establishes Q-Registry state and audit integrity on Sepolia.

It does NOT establish an AKSA -> USDT execution.

Fase 4 must not be marked DONE from this evidence alone.
