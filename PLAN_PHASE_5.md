# Implementation Plan: Phase 5 - x402 Payment Gateway

## Executive Summary
This phase implements the "Ghost Orchestrator" backend service (`apps/api`). Its primary role is to enforce the x402 (Payment Required) protocol for autonomous agents interactions. It acts as a gatekeeper, requiring agents to pay via Solana transactions before accessing premium data or Arcium computation results.

## Architecture
- **Runtime**: Node.js v24 (LTS)
- **Framework**: Hono (Lightweight, Edge-compatible)
- **Protocol**: HTTP/1.1 & HTTP/2
- **Network**: Solana Mainnet/Devnet (for signature verification)

## Feature Specification

### 1. x402 Middleware (`/middleware/x402.ts`)
- **Interception**: All routes under `/protected/*` are intercepted.
- **Challenge (402)**:
  - If no `PAYMENT-SIGNATURE` header is present:
    - Return HTTP 402.
    - Header `PAYMENT-REQUIRED`: JSON object with `network="solana"`, `amount`, `recipient`, `reference`.
- **Verification (200)**:
  - If `PAYMENT-SIGNATURE` is present:
    - Decode the signature and the original message/transaction.
    - Verify Ed25519 signature against the sender's public key.
    - Verify payment amount and recipient on-chain (using `connection.getTransaction`).

### 2. API Endpoints
- `GET /api/agent-manifest.json`: Public discovery for agents.
- `GET /api/market/orders`: Protected (Pay-per-view).

## Technical Requirements
- **Dependencies**: `hono`, `@hono/node-server`, `@solana/web3.js`, `tweetnacl`.
- **Performance**: Signature verification must be non-blocking.

## Verification
- **Curl Test**: 
  1. Request protected resource -> Expect 402.
  2. Parse header.
  3. (Simulated) specific header bypass or mock signature -> Expect 200.
