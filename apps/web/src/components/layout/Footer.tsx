"use client";

import { GlassPanel } from "../glass/GlassPanel";
import { Ghost, ExternalLink, Github, Twitter } from "lucide-react";
import Link from "next/link";

const PROGRAM_ID = "5oCgPmgHbb5h1qv3tkyVSW21Zjw75NzYEb5XYjUiqGxa";
const IDL_ADDRESS = "DjwX5KwXziS7omE3bLUPzMX8eTkN5ERruhx89NV4hmom";

export const Footer = () => {
    return (
        <footer className="relative z-10 mt-12 md:mt-20 border-t border-white/10">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl tracking-tighter mb-3 md:mb-4">
                            <Ghost className="w-5 h-5 md:w-6 md:h-6 text-[#00f0ff]" />
                            <span>GHOST<span className="text-white/40">MARKET</span></span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-md">
                            The privacy-preserving dark pool for autonomous AI agents.
                            Trade data, compute, and assets without revealing your strategy.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Protocol</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/market" className="text-white/50 hover:text-[#00f0ff] transition-colors">Marketplace</Link></li>
                            <li><Link href="/agents" className="text-white/50 hover:text-[#00f0ff] transition-colors">Agent Dashboard</Link></li>
                            <li><Link href="/docs" className="text-white/50 hover:text-[#00f0ff] transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Community</h4>
                        <div className="flex gap-3">
                            <a href="https://github.com" target="_blank" rel="noopener" className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                <Github className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener" className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                <Twitter className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contract Info */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
                    <GlassPanel className="!p-3 md:!p-4 !rounded-lg md:!rounded-xl">
                        <div className="flex flex-col gap-4">
                            {/* Network Status */}
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]" />
                                <span className="text-xs text-white/40 uppercase tracking-wider">Solana Devnet</span>
                            </div>

                            {/* Contract Links - Stack on mobile, row on desktop */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                                <a
                                    href={`https://explorer.solana.com/address/${PROGRAM_ID}?cluster=devnet`}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#00f0ff] transition-colors group"
                                >
                                    <span className="text-white/40 text-xs">Program:</span>
                                    <code className="font-mono text-xs bg-white/5 px-2 py-1 rounded truncate max-w-[180px] sm:max-w-none">
                                        {PROGRAM_ID.slice(0, 8)}...{PROGRAM_ID.slice(-4)}
                                    </code>
                                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </a>

                                <a
                                    href={`https://explorer.solana.com/address/${IDL_ADDRESS}?cluster=devnet`}
                                    target="_blank"
                                    rel="noopener"
                                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[#bd00ff] transition-colors group"
                                >
                                    <span className="text-white/40 text-xs">IDL:</span>
                                    <code className="font-mono text-xs bg-white/5 px-2 py-1 rounded truncate max-w-[180px] sm:max-w-none">
                                        {IDL_ADDRESS.slice(0, 8)}...{IDL_ADDRESS.slice(-4)}
                                    </code>
                                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </GlassPanel>
                </div>

                {/* Copyright */}
                <div className="mt-6 md:mt-8 text-center">
                    <p className="text-xs text-white/30">
                        © 2026 GhostMarket. Built for the autonomous agent economy.
                    </p>
                </div>
            </div>
        </footer>
    );
};
