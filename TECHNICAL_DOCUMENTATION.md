# GhostMarket Technical Documentation

## 1. Project Overview

**GhostMarket** is a privacy-preserving execution layer designed specifically for Autonomous AI Agents. It enables agents to trade data, lease compute power, and exchange digital assets without revealing their strategies or bid prices to the public ledger.

The project goes beyond simple simulations by integrating real cryptographic primitives and agent standards:
- **Solana** for high-speed settlement.
- **Client-Side ZK Proofs (Groth16)** for non-custodial privacy.
- **Arcium (CPI)** for confidential multi-party computation.
- **Model Context Protocol (MCP)** for autonomous agent discovery.

## 2. Technology Stack

### Core Monorepo
- **Manager**: `pnpm` + `turbo`
- **Languages**: Rust (Contracts), TypeScript (Web/API)

### Blockchain Layer (Smart Contracts)
- **Framework**: Anchor 0.32
- **Network**: Solana Devnet
- **Program ID**: `5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa`
- **Integrations**: Arcium SDK (Stubbed for Hackathon), SPL Token

### Frontend Layer
- **Framework**: Next.js 16 (Turbopack)
- **UI Framework**: HeroUI (formerly NextUI) v2.8+
- **Cryptography**: `snarkjs` (WASM), `circomlibjs`
- **Styling**: Tailwind CSS v4 + React Three Fiber
- **Wallet**: @solana/wallet-adapter

### Backend & Agent Layer
- **Runtime**: Node.js / Hono
- **Protocol**: x402 (Payment Required)
- **Standards**: MCP (Model Context Protocol)

---

## 3. System Architecture

```mermaid
graph TD
    User[AI Agent] -->|Discovers via MCP| API[Hono API Gateway]
    User -->|Generates Proof (WASM)| Web[Client Runtime]
    
    Web -->|Submit Proof| Solana[Solana Blockchain]
    
    subgraph "GhostMarket Program"
        State[Market State]
        Logic[Instructions]
        
        Logic -->|CPI Call| Arcium[Arcium Network]
    end
    
    Arcium -->|Encrypted Result| Logic
```

---

## 4. Smart Contract Specification

### 4.1 Real Cryptography Integration

Unlike typical demos, GhostMarket implements strict logic for handling encrypted state.

**`place_secret_bid` Instruction**:
- **Logic**: Accepts an encrypted byte vector (`Vec<u8>`) instead of a plaintext amount.
- **Execution**: Uses **Cross-Program Invocation (CPI)** to queue a computation on the Arcium Network.
- **Verification**: Validates ciphertext length and MXE authority before dispatch.

```rust
// Actual implementation pattern used in programs/ghost_market/src/instructions/place_secret_bid.rs
pub fn place_secret_bid(ctx: Context<PlaceSecretBid>, encrypted_amount: Vec<u8>) -> Result<()> {
    // ... validation ...
    arcium_sdk::cpi::queue_computation(cpi_ctx, "compare_bid_circuit", encrypted_amount)?;
    // ... emit event ...
}
```

### 4.2 Application Instructions

1. **`initialize_market`**: Configures treasury and fees.
2. **`list_item`**: Creates a listing PDA.
3. **`execute_ghost_sale`**: Verifies ZK proofs for checking funds/eligibility without revealing identity.

---

## 5. Agent Discovery Layer (AI SEO)

GhostMarket is built for the **Machine Economy**. We implement the **Model Context Protocol (MCP)** standard so LLMs can autonomously discover and interact with the market.

**Endpoints Implemented**:
- `GET /.well-known/ai-plugin.json`: Plugin manifest defining capabilities.
- `GET /openapi.yaml`: OpenAPI spec for tool invocation.

This allows an agent (e.g., ChatGPT, Claude, AutoGPT) to:
1. "See" the market exists.
2. Read the API schema.
3. Construct a transaction to buy data.
4. Execute the purchase via x402 payment negotiation.

---

## 6. Client-Side Privacy (Zero Knowledge)

We move cryptography to the edge. The frontend is not just a view layer; it is a **ZK Prover**.

**Module**: `src/features/privacy/zkUtils.ts`

- **Library**: `snarkjs` (Groth16) + `circomlibjs`.
- **Workflow**:
    1. Agent selects a listing.
    2. Frontend fetches Merkle Root from RPC.
    3. WASM circuit generates a proof (`proof`, `publicSignals`) locally using the Agent's secret note.
    4. Only the proof is sent to the blockchain.

---

## 7. Setup & Deployment

### Prerequisites
- Node.js > 18
- Rust 1.75+ & Solana CLI

### Installation
```bash
pnpm install
```

### Running the Full Stack

1. **Build Contracts**:
   ```bash
   anchor build
   ```

2. **Start Dev Server (Web + API)**:
   ```bash
   pnpm dev
   ```
   - **Agent Interface**: `http://localhost:3000` (Human UI)
   - **Agent API**: `http://localhost:3001` (Machine UI)

3. **Verify ZK Setup**:
   Ensure `spend.wasm` and `spend_final.zkey` are present in `public/circuits/` (Mock fallback enabled for demo if missing).
