- [ ] **Step 1: Scaffolding `apps/api`**
  - [ ] Initialize directory and `package.json`.
  - [ ] Install `hono`, `@hono/node-server`, `tsx`, `@solana/web3.js`.

- [ ] **Step 2: Server Setup**
  - [ ] Create `src/index.ts` with basic Hono app.
  - [ ] Configure port 3001.

- [ ] **Step 3: Middleware Implementation**
  - [ ] Implement `x402Middleware`.
  - [ ] Create helper `verifySolanaSignature`.

- [ ] **Step 4: Endpoints**
  - [ ] `GET /` (Health check).
  - [ ] `GET /protected/market-data` (x402 gated).
  - [ ] `GET /.well-known/ai-plugin.json` (Agent manifest).

- [ ] **Step 5: Verification**
  - [ ] Write a script `test-x402.sh` to curl and assert status codes.
