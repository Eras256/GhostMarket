# Global Architectural Rules & Constraints: GhostMarket (GM-2026-SOL)

This file persists strict architectural and operational constraints for the GhostMarket project. All agents must read and adhere to these rules before modifying the codebase.

## 1. Operational Mode
- **Planning Mode Only**: No "Vibe Coding". All work must be preceded by a Task List and Implementation Plan.
- **Artifact Generation**: 
  - Major library decisions require an Architecture Decision Record (ADR).
  - Module completion requires a Walkthrough artifact (visual or terminal validation).
- **Documentation**: All new features must include updated documentation.

## 2. Technology Stack Limits
- **PackageManager**: `pnpm` (v10.x) with workspaces.
- **Build System**: `turbo` (Turborepo).
- **Blockchain**: Solana (Anchor 0.31+).
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4.0.
- **UI Library**: HeroUI (primary), Custom Glass Engine (secondary).
- **Backend Runtime**: Node.js v24 (LTS) or Bun v1.2.
- **Language**: TypeScript (Strict Mode) for off-chain, Rust for on-chain.

## 3. Design System (Neural Glassmorphism)
- **Glass Engine**: Use `backdrop-filter: blur(20px)` and strict border/noise textures.
- **Visuals**: No flat design. Use "Neural" gradients and 3D visualisations.
- **Performance**: 3D elements must target 60 FPS.

## 4. Privacy & Security
- **Data Handling**: No cleartext private keys on the server or client local storage (except encrypted/shielded contexts).
- **ZKP**: All privacy-preserving features must use client-side proof generation (Privacy Cash SDK).
- **Encryption**: Arcium interactions must encrypt data *before* network transmission.
- **Dependencies**: Pin dependencies to avoid upstream supply chain attacks.

## 5. Testing & Validation
- **Smart Contracts**: Full coverage with `anchor test` and `trident` fuzzing.
- **Frontend**: E2E tests with Playwright.
- **Linting**: Strict linting rules to prevent `any` types.
