"use client";

import { useEffect, useState } from "react";
import { useGhostMarket } from "@/hooks/useGhostMarket";
import { Plus, Shield, Eye } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { Button, Card, CardBody, CardFooter, Chip, Skeleton, Divider } from "@heroui/react";
import { toast } from "sonner";

interface Listing {
    publicKey: PublicKey;
    account: {
        price: string; // stringified BN
        isPrivate: boolean;
        seller: PublicKey;
        x402GatewayUrl: string;
    };
}

export default function MarketPage() {
    const { connected, getAllListings, listItem, executeGhostSale } = useGhostMarket();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);

    // Form State
    const [price] = useState("1000000"); // 1 USDC/SOL defaultish
    const [isPrivate] = useState(true);
    const [url] = useState("http://localhost:3001/protected/market-data");

    useEffect(() => {
        if (connected) {
            fetchListings();
        }
    }, [connected]);

    const fetchListings = async () => {
        setLoading(true);
        const data = await getAllListings();
        const formatted = data.map((item: any) => ({
            publicKey: item.publicKey,
            account: {
                ...item.account,
                price: item.account.price.toString(),
            },
        }));
        setListings(formatted);
        setLoading(false);
    };

    const handleCreateListing = async () => {
        try {
            setCreating(true);
            const listingId = BigInt(Date.now());
            const priceBi = BigInt(price);

            await listItem(listingId, priceBi, isPrivate, null, url);

            await fetchListings();
            toast.success("Listing created successfully!", {
                description: "Your data is now encrypted and listed on the Ghost Market."
            });
        } catch (e) {
            console.error(e);
            toast.error("Failed to create listing", {
                description: "Check console for details."
            });
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Marketplace</h1>
                    <p className="text-white/40 mt-1">Confidential Machine-to-Machine Exchange</p>
                </div>
                <Button
                    onClick={handleCreateListing}
                    isDisabled={!connected || creating}
                    isLoading={creating}
                    className="bg-[#00f0ff] text-black font-bold h-12 px-6 rounded-xl hover:scale-105 transition-transform"
                    startContent={!creating && <Plus className="w-5 h-5" />}
                >
                    Create Test Listing
                </Button>
            </div>

            {!connected ? (
                <Card className="bg-white/5 border-white/10 backdrop-blur-3xl p-12 text-center">
                    <CardBody>
                        <h2 className="text-2xl text-white/50 font-light italic text-center">Connect your wallet to peer into the dark pool.</h2>
                    </CardBody>
                </Card>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-2xl bg-white/5" />)}
                </div>
            ) : listings.length === 0 ? (
                <Card className="bg-white/5 border-white/10 p-12 text-center">
                    <CardBody>
                        <h2 className="text-2xl text-white/50 font-light italic text-center">The dark pool is currently empty. Start a listing.</h2>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((l) => (
                        <Card key={l.publicKey.toString()} className="bg-white/5 border-white/10 backdrop-blur-2xl hover:border-[#00f0ff]/40 transition-all overflow-hidden group">
                            <CardBody className="gap-6 p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-white/30 truncate max-w-[120px]">{l.publicKey.toString()}</span>
                                    <Chip
                                        variant="flat"
                                        className={l.account.isPrivate ? "bg-[#bd00ff]/10 text-[#bd00ff]" : "bg-[#00f0ff]/10 text-[#00f0ff]"}
                                        startContent={l.account.isPrivate ? <Shield className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    >
                                        {l.account.isPrivate ? "Encrypted" : "Public"}
                                    </Chip>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white truncate group-hover:text-[#00f0ff] transition-colors">{l.account.x402GatewayUrl}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/5 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                                        </div>
                                        <p className="text-white/40 text-xs font-mono">{l.account.seller.toString().slice(0, 12)}...</p>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white">{l.account.price}</span>
                                    <span className="text-xs font-medium text-white/30 uppercase tracking-widest">lamports</span>
                                </div>
                            </CardBody>
                            <Divider className="bg-white/5" />
                            <CardFooter className="p-4 bg-white/[0.02]">
                                <Button
                                    fullWidth
                                    onClick={async () => {
                                        if (confirm("Execute Mock Ghost Sale? (0.0 SOL)")) {
                                            try {
                                                const promise = executeGhostSale();
                                                toast.promise(promise, {
                                                    loading: 'Synthesizing ZK Proof...',
                                                    success: 'Transfer Complete. Identity Shielded.',
                                                    error: 'Protocol Error during proof generation.'
                                                });
                                                await promise;
                                            } catch (e) { console.error(e); }
                                        }
                                    }}
                                    className="bg-white/5 hover:bg-white/10 text-white font-bold h-12 rounded-xl border border-white/10"
                                >
                                    {l.account.isPrivate ? "Place Secret Bid" : "Buy Access"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
