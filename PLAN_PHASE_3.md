# Implementation Plan: Phase 3 - Privacy Integrations

## Executive Summary
This phase bridges the public `ghost_market` contract with the privacy-preserving protocols: **Privacy Cash** (for shielded payments) and **Arcium** (for confidential dark pool bidding).

## 1. Arcium MXE Integration (Confidential Computing)
- **Objective**: Allow users to submit encrypted bids that are processed by Multiparty Execution Environments (MXEs) without revealing values on-chain.
- **Mechanism**:
  - Implement `place_secret_bid` instruction.
  - Integration with `arcium_sdk` (simulated/CPI).
  - Store `EncryptedOrder` state locally or queue it for MXE.

## 2. Privacy Cash Integration (Shielded Transactions)
- **Objective**: Allow executing sales using Zero-Knowledge Proofs (ZKPs) to prove funding without linking the buyer's identity.
- **Mechanism**:
  - Implement `execute_ghost_sale` instruction.
  - CPI call to `privacy_cash_program::verify_proof`.
  - Upon valid proof, release assets from escrow to a "clean" address.

## 3. Privacy Audit Artifact
- Generate `PRIVACY_AUDIT.md` to identify potential metadata leakage (e.g., timing attacks, sizing correlation).

## Technical Requirements
- **Arcium**: Use `arcium-sdk` crate (mock/stub if unavailable in enviromment).
- **Privacy Cash**: Define the CPI interface for the verifier.
- **Security**: Ensure proofs cannot be replayed (Nullifier checks).

## Verification
- **Compilation**: `anchor build` with new instructions.
- **Audit**: Self-check against the `PRIVACY_AUDIT.md` checklist.
