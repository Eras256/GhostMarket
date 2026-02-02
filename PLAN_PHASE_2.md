# Implementation Plan: Phase 2 - Core Contracts (Solana)

## Executive Summary
This phase focuses on initializing the Solana Smart Contract layer using the Anchor framework. We will implement the `ghost_market` program, defining the core data structures (`MarketState`, `Listing`) and the foundational instructions for market initialization and item listing.

## Architecture & Data Structures

### 1. MarketState (Singleton)
- **Purpose**: Manages global configuration, authority, and fee accumulation.
- **Fields**:
  - `authority`: Pubkey (Admin/DAO)
  - `treasury`: Pubkey (Fee destination)
  - `fee_basis_points`: u16
  - `total_volume`: u64
  - `bump`: u8

### 2. Listing (Per Item)
- **Purpose**: Represents an asset or service for sale. Supports both public and private (confidential) modes.
- **Fields**:
  - `seller`: Pubkey
  - `mint`: Pubkey (Optional, for SPL tokens)
  - `price`: u64
  - `is_private`: bool
  - `arcium_mxe_pubkey`: Option<Pubkey> (For Dark Pool)
  - `x402_gateway_url`: String (max 200 chars)
  - `bump`: u8

## Instructions
1.  **initialize_market**: Sets up the global state PDA.
2.  **list_item**: Creates a listing, checks string limits, and transfers assets to escrow (if applicable).

## Technical Requirements
- **Framework**: Anchor 0.30+ (using latest available stable).
- **Security**: strict typing, `msg!` macros for logging, reentrancy safety where applicable.
- **Testing**: validation of PDA derivation and account constraints.

## Verification Strategy
- **Compilation**: `anchor build` must pass without warnings.
- **Unit Testing**: `anchor test` must verify `initialize_market` correctly sets the authority.
