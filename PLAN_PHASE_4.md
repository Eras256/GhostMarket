# Implementation Plan: Phase 4 - Neural Frontend

## Executive Summary
This phase entails building the "Neural Glass" frontend interface using Next.js 16. The design will feature a "Glassmorphism" aesthetic with a high-performance 3D background ("Neural Lattice") representing blockchain activity.

## Architecture
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4.0 (Zero-runtime)
- **Component Library**: HeroUI (fka NextUI)
- **Visuals**: React Three Fiber (R3F) + Drei

## Feature Specification

### 1. Project Scaffolding (`apps/web`)
- Initialize Next.js app within the monorepo.
- Configure Tailwind v4.
- Configure HeroUI provider.

### 2. Core Components
- **Neural Navbar**: Floating, glassmorphic header using `backdrop-filter`.
- **Neural Lattice (Background)**:
  - R3F Canvas rendering a 3D force-directed graph or particle system.
  - Performance target: 60 FPS (using `InstancedMesh` if needed).
- **GlassPanel**: Reusable container with noise texture and border gradients.

### 3. State Integration
- **Wallet Connection**: `@solana/wallet-adapter-react`.
- **Global State**: `zustand` for UI state (e.g., sidebar open, theme).

## Technical Requirements
- **Responsive**: Mobile-first design.
- **Performance**: Heavy 3D elements must use `useFrame` optimisations.
- **Structure**: Feature-Sliced Design (FSD) inspired folder structure.

## Verification
- **Visual Check**: Navbar blur effect works (requires browser/screenshot).
- **Performance**: 3D background runs smoothly.
- **Build**: `pnpm build` succeeds for `apps/web`.
