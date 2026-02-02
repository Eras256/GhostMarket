import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GhostMarket } from "../target/types/ghost_market";
const fs = require('fs');

describe("ghost_market", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.AnchorProvider.env());

    const program = anchor.workspace.GhostMarket as Program<GhostMarket>;

    it("Is initialized!", async () => {
        // Add your test here.
        const [marketStatePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("market_state")],
            program.programId
        );

        const treasury = anchor.web3.Keypair.generate().publicKey;

        try {
            const tx = await program.methods
                .initializeMarket(treasury, 200) // 200 bps = 2%
                .accounts({
                    marketState: marketStatePda,
                    authority: anchor.getProvider().publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any) // Type check workaround if needed
                .rpc();

            console.log("Your transaction signature", tx);
        } catch (e: any) {
            console.error("Error signature:", e);
            if (e.logs) {
                console.error("Logs:", e.logs);
            }
            throw e;
        }

        const account = await program.account.marketState.fetch(marketStatePda);
        console.log("Market Authority:", account.authority.toBase58());
        console.log("Treasury:", account.treasury.toBase58());

        if (account.feeBasisPoints !== 200) {
            throw new Error("Fee basis points mismatch");
        }
    });
});
