"use client";

import { Terminal, Play, Pause, RefreshCw, Command } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button, Kbd, Input } from "@heroui/react";

export default function OperatePage() {
    const [logs, setLogs] = useState<string[]>([
        "> Initializing Ghost Terminal v2.0.4...",
        "> Connection established to Solana Devnet",
        "> Arcium MXE Keys loaded: [Encrypted]",
        "> System Ready. Waiting for command input..."
    ]);

    // Simulate logs
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newLog = `> [${new Date().toLocaleTimeString()}] Monitoring mempool block ${Math.floor(Math.random() * 100000)}...`;
                setLogs(prev => [...prev.slice(-15), newLog]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Ghost Terminal</h1>
                    <p className="text-white/40 mt-1 font-mono text-sm uppercase tracking-widest">Manual Override • Secure Protocol</p>
                </div>

                <div className="flex gap-3">
                    <Button isIconOnly variant="flat" color="success" className="bg-green-500/10 text-green-400 border border-green-500/20">
                        <Play className="w-5 h-5" />
                    </Button>
                    <Button isIconOnly variant="flat" color="warning" className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Pause className="w-5 h-5" />
                    </Button>
                    <Button isIconOnly variant="flat" className="bg-white/5 text-white border border-white/10">
                        <RefreshCw className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Terminal Window */}
            <Card className="flex-1 flex flex-col font-mono text-sm bg-black/40 border-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl ring-1 ring-[#00f0ff]/10">
                {/* Terminal Header */}
                <CardHeader className="bg-white/[0.03] px-5 py-3 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <div className="h-4 w-[1px] bg-white/10 mx-2" />
                        <Terminal className="w-4 h-4 text-[#00f0ff]" />
                        <span className="text-white/60 text-xs font-bold tracking-tight uppercase">root@ghost-node:~</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">SSH: AES-256</span>
                        <span className="text-[10px] text-green-500/50 font-bold uppercase tracking-widest">Connected</span>
                    </div>
                </CardHeader>

                {/* Log Output */}
                <CardBody className="flex-1 p-6 overflow-y-auto space-y-2 bg-[#050508]/50">
                    {logs.map((log, i) => (
                        <div key={i} className="text-green-500/80 hover:bg-white/[0.03] px-3 py-1 rounded-md transition-all font-mono leading-relaxed border-l-2 border-transparent hover:border-green-500/30">
                            <span className="text-green-900 mr-2 opacity-50 select-none">[{i.toString().padStart(3, '0')}]</span>
                            {log}
                        </div>
                    ))}
                    <div className="flex items-center gap-2 px-3">
                        <span className="text-green-900 opacity-50 select-none">[{logs.length.toString().padStart(3, '0')}]</span>
                        <div className="w-2 h-4 bg-[#00f0ff] animate-pulse" />
                    </div>
                </CardBody>

                {/* Input Area */}
                <div className="bg-white/[0.03] p-4 border-t border-white/10">
                    <Input
                        variant="underlined"
                        placeholder="EX: ghost_node --rebalance --vault mainnet"
                        startContent={<Command className="w-4 h-4 text-[#00f0ff]/50 mr-2" />}
                        endContent={<Kbd keys={["enter"]}>CMD</Kbd>}
                        classNames={{
                            input: "text-[#00f0ff] font-mono text-sm placeholder:text-white/10",
                            inputWrapper: "border-b-white/10 group-data-[focus=true]:border-b-[#00f0ff]/50"
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}
