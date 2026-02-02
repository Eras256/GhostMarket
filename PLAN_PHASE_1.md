# Implementation Plan: Phase 1 - Initialization (GhostMarket)

## Executive Summary
This plan details the initialization of the GhostMarket monorepo. The goal is to establish the build system, directory structure, and shared configuration for the frontend, backend, and smart contract workspaces.

## Dependency Graph & Topology
The monorepo will leverage `pnpm` workspaces with `turbo` for build orchestration.

### Workspace Structure
```
root
├── apps
│   ├── web (Next.js 16 + HeroUI)
│   └── api (NestJS/Node.js)
├── packages
│   ├── ui (Shared HeroUI components + Tailwinc Config)
│   ├── sdk (Generated Anchor Types + Arcium/x402 wrappers)
│   └── tsconfig (Shared TypeScript bases)
├── programs
│   └── ghost_market (Rust/Anchor)
└── tooling (Optional: ESLint configs, Prettier)
```

## Phase 1 Tasks

### 1. Repository Scaffolding
- [ ] Initialize `package.json` with `pnpm`.
- [ ] Create `pnpm-workspace.yaml`.
- [ ] Initialize `turbo.json` with global build pipeline.
- [ ] Create `.gitignore` tailored for Node/Rust/Solana.

### 2. Apps & Packages Setup (Skeleton)
- [ ] Create directory structure: `apps/`, `packages/`, `programs/`.
- [ ] Initialize `apps/web` (Placeholder for Phase 4, just directory and basic package.json).
- [ ] Initialize `apps/api` (Placeholder for Phase 6).
- [ ] Initialize `programs/ghost_market` (Placeholder for Phase 2).

### 3. Tooling Configuration
- [ ] Install root dependencies: `turbo`, `typescript`, `prettier`.

## Verification Strategy
- **File Check**: Verify directory tree matches topology.
- **Build Check**: Run `pnpm install` ensures no peer dependency warnings.
- **Turbo Check**: Run `pnpm build` (even if empty) to verify Turbo pipeline instantiation.
