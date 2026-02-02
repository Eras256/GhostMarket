"use client";

import { Bot, Activity, Cpu, HardDrive, Wifi } from "lucide-react";
import { Card, CardBody, CardHeader, Divider, Progress, Chip } from "@heroui/react";

export default function AgentsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-black text-white mb-10 tracking-tight">Agent Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Agent Identity Card */}
                <Card className="md:col-span-1 bg-white/5 border-white/10 backdrop-blur-3xl p-6">
                    <CardBody className="flex flex-col items-center text-center gap-6">
                        <div className="w-32 h-32 rounded-full bg-white/5 border-2 border-[#00f0ff]/20 flex items-center justify-center relative shadow-[0_0_40px_rgba(0,240,255,0.1)]">
                            <Bot className="w-16 h-16 text-[#00f0ff] animate-pulse" />
                            <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-[#050508] shadow-[0_0_10px_#22c55e]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Ghost_Operative_01</h2>
                            <p className="text-white/40 text-sm font-mono mt-1">ID: 0x8a7...2b9</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white/5 rounded-xl py-4 border border-white/5">
                                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mb-1">Reputation</p>
                                <p className="text-[#00f0ff] text-xl font-black font-mono tracking-tighter">98.5</p>
                            </div>
                            <div className="bg-white/5 rounded-xl py-4 border border-white/5">
                                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mb-1">Tasks</p>
                                <p className="text-white text-xl font-black font-mono tracking-tighter">1,240</p>
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-xs text-white/40 font-mono">
                                <span>HEALTH</span>
                                <span>92%</span>
                            </div>
                            <Progress size="sm" color="success" value={92} className="max-w-md" />
                        </div>
                    </CardBody>
                </Card>

                {/* System Status Grid */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatusCard
                        icon={<Activity className="text-green-400" />}
                        label="Uptime"
                        value="99.98%"
                        subtext="Last outage: 42d ago"
                        color="success"
                    />
                    <StatusCard
                        icon={<Cpu className="text-[#bd00ff]" />}
                        label="Compute Load"
                        value="45%"
                        subtext="Arcium MXE connected"
                        color="secondary"
                    />
                    <StatusCard
                        icon={<Wifi className="text-[#00f0ff]" />}
                        label="Network Latency"
                        value="12ms"
                        subtext="Solana Mainnet-Beta"
                        color="primary"
                    />
                    <StatusCard
                        icon={<HardDrive className="text-yellow-400" />}
                        label="Storage"
                        value="2.4TB"
                        subtext="Encrypted Shards"
                        color="warning"
                    />
                </div>
            </div>

            {/* Active Operation Log */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-3xl overflow-hidden">
                <CardHeader className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                        <h3 className="text-xl font-bold text-white tracking-tight">Real-time Operations</h3>
                    </div>
                    <Chip variant="dot" color="primary" className="border-white/10 text-white/60">NODE_VERSION: 2.0.4-PRO</Chip>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="divide-y divide-white/5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-5 hover:bg-white/[0.03] transition-colors group cursor-default">
                                <div className="flex items-center gap-6">
                                    <span className="font-mono text-xs text-white/20">{new Date().getHours()}:42:{15 + i}</span>
                                    <div>
                                        <p className="text-sm text-white font-bold group-hover:text-[#00f0ff] transition-colors">Execution_#{8820 + i}</p>
                                        <p className="text-xs text-zinc-500 mt-0.5">Route: Raydium &rarr; Orca • Result: <span className="text-green-400">+0.02 SOL</span></p>
                                    </div>
                                </div>
                                <Chip size="sm" variant="flat" color="success" className="bg-green-500/10 text-green-400 font-bold border border-green-500/20">
                                    VERIFIED_ON_CHAIN
                                </Chip>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

function StatusCard({ icon, label, value, subtext, color }: any) {
    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-2xl hover:border-white/20 transition-all group overflow-hidden">
            <CardBody className="p-6 justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/10 transition-colors">{icon}</div>
                    <Chip size="sm" variant="dot" color={color} className="text-white/30 font-mono">LIVE</Chip>
                </div>
                <div className="mt-8">
                    <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
                    <p className="text-sm text-white/50 font-bold mt-1 uppercase tracking-wider">{label}</p>
                    <Divider className="my-3 bg-white/5" />
                    <p className="text-xs text-white/20 font-mono">{subtext}</p>
                </div>
            </CardBody>
        </Card>
    );
}
