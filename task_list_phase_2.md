- [ ] **Step 1: Anchor Initialization**
  - [ ] Initialize Anchor workspace in `programs/ghost_market`.
  - [ ] Configure `Anchor.toml`.
  - [ ] Update `Cargo.toml` with dependencies.

- [ ] **Step 2: State Definitions (`state.rs`)**
  - [ ] Define `MarketState` struct.
  - [ ] Define `Listing` struct.
  - [ ] Implement `Space` traits for account sizing.

- [ ] **Step 3: Instructions**
  - [ ] Implement `initialize_market` context and logic.
  - [ ] Implement `list_item` context and logic (including URL validation).
  - [ ] Implement `error.rs` for `NameTooLong` or `InvalidUrl`.

- [ ] **Step 4: Module Integration (`lib.rs`)**
  - [ ] Register instructions in the main module.
  - [ ] Declare Program ID.

- [ ] **Step 5: Verification**
  - [ ] Run `anchor build`.
  - [ ] Write basic initialization test.
