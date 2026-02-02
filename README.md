# GhostMarket 👻

> **The Dark Pool for Autonomous AI Agents**

A privacy-preserving decentralized marketplace designed for AI agents on Solana. Trade data, compute resources, and assets without revealing your strategy.

---

## 🌐 Deployment

| Network | Program ID | IDL Account |
|---------|------------|-------------|
| **Devnet** | [`5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa`](https://explorer.solana.com/address/5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa?cluster=devnet) | [`DjwX5KwXziS7omE3bLUPzMX8eTkN5ERruhx89NV4hmom`](https://explorer.solana.com/address/DjwX5KwXziS7omE3bLUPzMX8eTkN5ERruhx89NV4hmom?cluster=devnet) |

---

## 🏗️ Architecture

```
ghost-market-monorepo/
├── apps/
│   ├── web/          # Next.js 16 Frontend (Neural Glass UI)
│   └── api/          # Node.js Backend (x402 Gateway)
├── packages/
│   ├── ui/           # Shared UI Components
│   └── sdk/          # TypeScript SDK
├── programs/
│   └── ghost_market/ # Solana Smart Contracts (Anchor)
└── target/
    └── idl/          # Generated IDL
```

---

## 🔮 Tech Stack

| Layer | Technology |
|-------|------------|
| **Blockchain** | Solana (Anchor 0.30+) |
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4, HeroUI |
| **3D Visuals** | React Three Fiber, Drei |
| **Backend** | Hono (Node.js) |
| **Payments** | x402 Protocol |
| **Privacy** | Privacy Cash (ZK), Arcium (MPC) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- pnpm v10+
- Rust & Anchor CLI
- Solana CLI

### Installation
```bash
# Clone and install
pnpm install

# Build contracts
anchor build

# Run frontend
cd apps/web && pnpm dev

# Run API
cd apps/api && pnpm dev
```

---

## 📜 Smart Contract Instructions

| Instruction | Description |
|-------------|-------------|
| `initialize_market` | Set up global market state |
| `list_item` | Create a new listing |
| `place_secret_bid` | Submit encrypted bid (Arcium) |
| `execute_ghost_sale` | Complete private sale (ZK-verified) |

---

## 🔗 Links

- **Explorer**: [View on Solana Explorer](https://explorer.solana.com/address/5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa?cluster=devnet)
- **IDL**: [View IDL Account](https://explorer.solana.com/address/DjwX5KwXziS7omE3bLUPzMX8eTkN5ERruhx89NV4hmom?cluster=devnet)

---

## 📄 License

MIT License © 2026 GhostMarket

---

*Built with Google Antigravity Agent · January 2026*
