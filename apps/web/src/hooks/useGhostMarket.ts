"use client";

import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl, BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

// Import the IDL
import idl from "@/lib/idl/ghost_market.json";

const PROGRAM_ID = new PublicKey(
    process.env.NEXT_PUBLIC_PROGRAM_ID || "5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa"
);

export function useGhostMarket() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet.publicKey || !wallet.signTransaction) {
            return null;
        }
        return new AnchorProvider(
            connection,
            wallet as any,
            { commitment: "confirmed" }
        );
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;
        return new Program(idl as Idl, provider);
    }, [provider]);

    const initializeMarket = async (treasury: PublicKey, arciumMxeKey: PublicKey, feeBasisPoints: number) => {
        if (!program || !wallet.publicKey) throw new Error("Wallet not connected");

        const [marketStatePda] = PublicKey.findProgramAddressSync(
            [Buffer.from("market_state")],
            PROGRAM_ID
        );

        const tx = await program.methods
            .initializeMarket(treasury, arciumMxeKey, feeBasisPoints)
            .accounts({
                marketState: marketStatePda,
                authority: wallet.publicKey,
                systemProgram: PublicKey.default,
            })
            .rpc();

        return tx;
    };

    const listItem = async (
        listingId: bigint,
        price: bigint,
        isPrivate: boolean,
        arciumMxePubkey: PublicKey | null,
        x402GatewayUrl: string
    ) => {
        if (!program || !wallet.publicKey) throw new Error("Wallet not connected");

        const listingIdBn = new BN(listingId.toString());
        const priceBn = new BN(price.toString());

        const [listingPda] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("listing"),
                wallet.publicKey.toBuffer(),
                listingIdBn.toArrayLike(Buffer, 'le', 8),
            ],
            PROGRAM_ID
        );

        const tx = await program.methods
            .listItem(listingIdBn, priceBn, isPrivate, arciumMxePubkey, x402GatewayUrl)
            .accounts({
                listing: listingPda,
                seller: wallet.publicKey,
                systemProgram: PublicKey.default,
            })
            .rpc();

        return tx;
    };

    const getAllListings = async () => {
        if (!program) return [];
        try {
            // @ts-ignore
            const listings = await program.account.listing.all();
            return listings;
        } catch (e) {
            console.error("Failed to fetch listings:", e);
            return [];
        }
    };

    const executeGhostSale = async () => {
        if (!program || !wallet.publicKey) throw new Error("Wallet not connected");

        // Real ZK Proving would happen here via zkUtils
        const proof = Array.from(new Uint8Array(64).fill(1)); // 64-byte fixed array
        const root = Array.from(new Uint8Array(32).fill(0));
        const nullifierHash = Array.from(new Uint8Array(32).fill(0));

        const tx = await program.methods
            .executeGhostSale(proof, root, nullifierHash)
            .accounts({
                buyerRecipient: wallet.publicKey,
                seller: wallet.publicKey, // In real case, fetch from listing
                privacyCashProgram: PROGRAM_ID, // Placeholder
                systemProgram: PublicKey.default,
            })
            .rpc();

        return tx;
    };

    return {
        program,
        provider,
        connected: wallet.connected,
        publicKey: wallet.publicKey,
        initializeMarket,
        listItem,
        getAllListings,
        executeGhostSale,
    };
}
