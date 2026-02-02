"use client";

import {
    ArrowRight,
    Shield,
    Zap,
    Lock,
    Cpu,
    Globe,
    Search,
    CheckCircle2,
    Layers,
    Bot,
    Terminal as TerminalIcon,
    ChevronRight,
    Code2
} from "lucide-react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Chip,
    Tabs,
    Tab,
    Accordion,
    AccordionItem
} from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="container mx-auto px-4 overflow-hidden">
            {/* HERO SECTION */}
            <section className="flex flex-col items-center text-center py-20 md:py-32 gap-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 backdrop-blur-md animate-pulse"
                >
                    <span className="text-xs font-semibold text-[#00f0ff] tracking-wide uppercase">System Live • Agent Protocol v2.4.0</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-[0.9] flex flex-col"
                >
                    GHOST <br />
                    <span className="text-[#00f0ff] drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">MARKET</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="max-w-3xl text-xl md:text-2xl text-white/50 leading-relaxed font-light italic"
                >
                    "Because a transparent economy is a vulnerable economy. <br className="hidden md:block" />
                    The first execution layer built for the secrets of Autonomous Agents."
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 mt-6 w-full sm:w-auto"
                >
                    <Button
                        as={Link}
                        href="/market"
                        size="lg"
                        className="bg-[#00f0ff] text-black font-black h-16 px-12 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all text-lg"
                        endContent={<ArrowRight className="w-6 h-6" />}
                    >
                        LAUNCH TERMINAL
                    </Button>
                    <Button
                        as={Link}
                        href="/agents"
                        variant="bordered"
                        size="lg"
                        className="border-white/20 text-white h-16 px-12 rounded-2xl hover:bg-white/10 backdrop-blur-md text-lg font-bold"
                    >
                        AGENT DASHBOARD
                    </Button>
                </motion.div>
            </section>

            {/* PROTOCOL OVERVIEW GRID */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                <HeroFeatureCard
                    icon={<Shield className="w-8 h-8 text-[#00f0ff]" />}
                    title="Privacy Cash"
                    description="Groth16 ZK-Proofs obfuscate transaction metadata. Your agent's purchasing history remains invisible to the public ledger."
                    delay={0.1}
                />
                <HeroFeatureCard
                    icon={<Lock className="w-8 h-8 text-[#bd00ff]" />}
                    title="Confidential Compute"
                    description="Matched orders are processed via Arcium MPC nodes. Bid prices and sensitive data are compute-blinded."
                    delay={0.2}
                />
                <HeroFeatureCard
                    icon={<Zap className="w-8 h-8 text-[#f0ff00]" />}
                    title="Autonomous x402"
                    description="Dynamic HTTP 402 negotiation allows agents to settle data payments in microseconds without human approval."
                    delay={0.3}
                />
            </section>

            {/* THE PROBLEM SECTION */}
            <section className="py-24 border-y border-white/5 bg-white/[0.01] -mx-4 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#bd00ff]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">The Machine Economy Crisis</h2>
                    <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
                        Public blockchains are transparent by design. In an era of Autonomous Agents, transparency is leakage.
                        Proprietary training data, investment strategies, and compute requirements are exposed,
                        inviting front-running and industrial sabotage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <Card className="bg-red-500/5 border-red-500/20 p-8">
                        <h3 className="text-red-400 font-bold text-2xl mb-4 flex items-center gap-3">
                            <XCircleIcon className="w-6 h-6" /> Legacy Execution
                        </h3>
                        <ul className="space-y-4 text-white/50">
                            <li className="flex gap-3"><span className="text-red-900">✖</span> Public Transaction History exposure.</li>
                            <li className="flex gap-3"><span className="text-red-900">✖</span> MEV Front-running on bidding.</li>
                            <li className="flex gap-3"><span className="text-red-900">✖</span> Lack of machine-native discovery protocols.</li>
                        </ul>
                    </Card>
                    <Card className="bg-green-500/5 border-green-500/20 p-8">
                        <h3 className="text-green-400 font-bold text-2xl mb-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6" /> GhostMarket Protocol
                        </h3>
                        <ul className="space-y-4 text-white/50">
                            <li className="flex gap-3"><span className="text-green-400">✔</span> Zero-Knowledge Settlement Layer.</li>
                            <li className="flex gap-3"><span className="text-green-400">✔</span> Blind matching via Arcium MXEs.</li>
                            <li className="flex gap-3"><span className="text-green-400">✔</span> Native MCP for autonomous discoverability.</li>
                        </ul>
                    </Card>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="py-32">
                <div className="text-center mb-20 px-4">
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase italic">Lifecycle of a Ghost Operation</h2>
                    <p className="text-white/30 text-lg uppercase tracking-[0.3em] font-bold">End-to-End Privacy Pipeline</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                    <div className="absolute hidden lg:block top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent -translate-y-1/2 z-0" />

                    <StepCard
                        number="01"
                        icon={<Search className="w-6 h-6" />}
                        title="DISCOVERY"
                        description="Agent crawls the Dark Pool via Model Context Protocol (MCP) to find encrypted compute/data listings."
                    />
                    <StepCard
                        number="02"
                        icon={<Zap className="w-6 h-6" />}
                        title="NEGOTIATION"
                        description="HTTP 402 GATEWAY handles autonomous payment negotiation without revealing the agent's intent."
                    />
                    <StepCard
                        number="03"
                        icon={<Shield className="w-6 h-6" />}
                        title="PROVING"
                        description="Client-side WASM Worker generates a Groth16 ZK-Proof to shield the source of funds & identity."
                    />
                    <StepCard
                        number="04"
                        icon={<Layers className="w-6 h-6" />}
                        title="SETTLEMENT"
                        description="Solana verifies the proof, and Arcium MXE matches the order in a confidential enclave."
                    />
                </div>
            </section>

            {/* TECHNOLOGY ECOSYSTEM GRID */}
            <section className="py-24 bg-white/[0.02] border border-white/5 rounded-[40px] px-8 md:px-16 mb-32 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00f0ff]/10 blur-3xl rounded-full" />
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/3">
                        <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-8 uppercase">The Tech Stack</h2>
                        <p className="text-white/40 text-lg leading-relaxed mb-8">
                            We use the most advanced primitives available in 2026 to ensure the machine economy remains resilient and private.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <TechBadge label="SOLANA Devnet" />
                            <TechBadge label="ANCHOR RUST" />
                            <TechBadge label="ZK GROTH16" />
                            <TechBadge label="ARCIUM MXE" />
                            <TechBadge label="MCP 1.0" />
                            <TechBadge label="NEXT.js 15" />
                            <TechBadge label="THREE.js" />
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <Card className="bg-black/60 border-white/10 p-6 backdrop-blur-3xl hover:border-[#00f0ff]/40 transition-all group overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-[#00f0ff]" />
                                </div>
                                <h4 className="text-xl font-bold text-white tracking-tight">Agent Discovery Layer</h4>
                            </div>
                            <p className="text-white/30 text-sm italic mb-4">"Natively readable by GPT-5, Claude 4, and autonomous LLM swarms."</p>
                            <Divider className="my-4 bg-white/5" />
                            <ul className="space-y-2 text-white/50 text-sm font-mono">
                                <li className="flex justify-between"><span>MANIFEST:</span> <span className="text-[#00f0ff]">ai-plugin.json</span></li>
                                <li className="flex justify-between"><span>SPEC:</span> <span className="text-[#00f0ff]">OpenAPI v3.1</span></li>
                                <li className="flex justify-between"><span>PROTOCOL:</span> <span className="text-[#00f0ff]">MCP</span></li>
                            </ul>
                        </Card>

                        <Card className="bg-black/60 border-white/10 p-6 backdrop-blur-3xl hover:border-[#bd00ff]/40 transition-all group overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#bd00ff]/10 flex items-center justify-center">
                                    <Cpu className="w-6 h-6 text-[#bd00ff]" />
                                </div>
                                <h4 className="text-xl font-bold text-white tracking-tight">Confidential Compute</h4>
                            </div>
                            <p className="text-white/30 text-sm italic mb-4">"Blind matching via Multi-Party Computation and enclaves."</p>
                            <Divider className="my-4 bg-white/5" />
                            <ul className="space-y-2 text-white/50 text-sm font-mono">
                                <li className="flex justify-between"><span>CORE:</span> <span className="text-[#bd00ff]">Arcium Nodes</span></li>
                                <li className="flex justify-between"><span>ENCRYPT:</span> <span className="text-[#bd00ff]">MXE Enclaves</span></li>
                                <li className="flex justify-between"><span>DATA:</span> <span className="text-[#bd00ff]">ZK-Shielded</span></li>
                            </ul>
                        </Card>

                        <Card className="bg-black/60 border-white/10 p-6 backdrop-blur-3xl hover:border-yellow-500/40 transition-all group overflow-hidden sm:col-span-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-yellow-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white tracking-tight font-mono tracking-tighter">MACHINE-NATIVE TERMINAL</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <p className="text-white/40 text-sm">
                                    An interface optimized for machine vision and high-throughput monitoring. Manual override supports CLI commands for complex node management.
                                </p>
                                <div className="p-3 bg-black rounded-lg border border-white/5 font-mono text-[10px] text-green-500/80">
                                    <div>$ ghost_market --init --stealth</div>
                                    <div className="text-white/20">Initialising ghost node... complete.</div>
                                    <div>$ ghost_market --bid --encrypted [DATA_SHARD_8]</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="text-center py-20 mb-32 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,240,255,0.05)_0%,transparent_70%)]" />
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-12 uppercase italic">Join the Ghost Economy</h2>
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-3xl flex-1 max-w-sm hover:-translate-y-2 transition-transform">
                        <Shield className="w-16 h-16 text-[#00f0ff] mx-auto mb-6" />
                        <h5 className="text-2xl font-black text-white mb-2">FOR AGENTS</h5>
                        <p className="text-white/40 text-sm mb-8 italic">Shield your liquidity, trade secrets, and operational alpha on-chain.</p>
                        <Button as={Link} href="/market" fullWidth className="bg-[#00f0ff] text-black font-bold h-12 rounded-xl">START LISTING</Button>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-3xl flex-1 max-w-sm hover:-translate-y-2 transition-transform">
                        <Code2 className="w-16 h-16 text-[#bd00ff] mx-auto mb-6" />
                        <h5 className="text-2xl font-black text-white mb-2">FOR BUILDERS</h5>
                        <p className="text-white/40 text-sm mb-8 italic">Integrate our MCP discoverable SDK into your agent's core brain.</p>
                        <Button fullWidth variant="bordered" className="text-white font-bold h-12 rounded-xl">VIEW DOCS</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function HeroFeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <Card className="bg-white/5 border-white/10 backdrop-blur-2xl hover:border-[#00f0ff]/30 transition-all p-2 group overflow-hidden h-full">
                <CardBody className="gap-4 p-6">
                    <div className="w-14 h-14 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-[#00f0ff]/10 group-hover:border-[#00f0ff]/30 transition-all duration-500">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors tracking-tight">{title}</h3>
                    <p className="text-white/50 leading-relaxed font-light text-sm">{description}</p>
                </CardBody>
            </Card>
        </motion.div>
    );
}

function StepCard({ number, icon, title, description }: any) {
    return (
        <div className="flex flex-col items-center text-center gap-6 relative z-10 group">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00f0ff] group-hover:bg-[#00f0ff] group-hover:text-black transition-all duration-500 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                {icon}
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-white/50 select-none">
                    {number}
                </div>
            </div>
            <div>
                <h4 className="text-lg font-black text-white tracking-widest mb-2 group-hover:text-[#00f0ff] transition-colors">{title}</h4>
                <p className="text-white/40 text-xs leading-relaxed max-w-[200px] font-mono">{description}</p>
            </div>
        </div>
    );
}

function TechBadge({ label }: { label: string }) {
    return (
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-[10px] font-black tracking-widest text-[#00f0ff] uppercase">{label}</span>
        </div>
    );
}

function XCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
        </svg>
    )
}
