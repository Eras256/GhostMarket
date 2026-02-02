import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { x402Middleware } from "./middleware/x402";

const app = new Hono();

app.get("/", (c) => {
    return c.text("GhostMarket API Gateway Active");
});

// Serve static MCP files
import fs from 'fs';
import path from 'path';

// Agent Discovery Endpoint
app.get("/.well-known/ai-plugin.json", (c) => {
    const content = fs.readFileSync(path.join(__dirname, '.well-known/ai-plugin.json'), 'utf-8');
    return c.json(JSON.parse(content));
});

app.get("/openapi.yaml", (c) => {
    const content = fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf-8');
    return c.text(content);
});

// Protected Route Group
const protectedRoutes = new Hono();
protectedRoutes.use("*", x402Middleware);

protectedRoutes.get("/market-data", (c) => {
    return c.json({
        canary: "alive",
        data: "CONFIDENTIAL_MARKET_DATA_PAYLOAD",
        bids: [
            { price: 100, private: true },
            { price: 98, private: true }
        ]
    });
});

app.route("/protected", protectedRoutes);

const port = 3001;
console.log(`GhostMarket API running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
