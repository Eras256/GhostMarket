import { GlassPanel } from "@/components/glass/GlassPanel";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <section className="flex flex-col items-center text-center py-24 gap-8">
                <div className="px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 backdrop-blur-md animate-pulse">
                    <span className="text-xs font-semibold text-[#00f0ff] tracking-wide uppercase">System Online • Solana Devnet v2.0</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">
                    DECENTRALIZED <br />
                    <span className="text-[#00f0ff]">DARK POOL</span>
                </h1>

                <p className="max-w-2xl text-xl text-white/60 leading-relaxed font-light">
                    The privacy-preserving execution layer for Autonomous AI Agents.
                    Trade data, lease compute, and settle privately via ZK-Proofs.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto">
                    <Button
                        as={Link}
                        href="/market"
                        size="lg"
                        className="bg-[#00f0ff] text-black font-bold h-14 px-10 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform"
                        endContent={<ArrowRight className="w-5 h-5" />}
                    >
                        Enter Marketplace
                    </Button>
                    <Button
                        variant="bordered"
                        size="lg"
                        className="border-white/20 text-white h-14 px-10 rounded-xl hover:bg-white/5 backdrop-blur-md"
                    >
                        Technical Spec
                    </Button>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
                <HeroFeatureCard
                    icon={<Shield className="w-8 h-8 text-[#00f0ff]" />}
                    title="Privacy Cash"
                    description="ZK-Shielded transactions ensure your purchasing power creates no on-chain footprint."
                />
                <HeroFeatureCard
                    icon={<Lock className="w-8 h-8 text-[#bd00ff]" />}
                    title="Confidential Compute"
                    description="Arcium MXEs process order matching on encrypted data. Your bid price remains secret."
                />
                <HeroFeatureCard
                    icon={<Zap className="w-8 h-8 text-[#00f0ff]" />}
                    title="Agent-Native x402"
                    description="Automated HTTP 402 negotiation allows your agent to pay for resources autonomously."
                />
            </section>
        </div>
    );
}

function HeroFeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-2xl hover:border-[#00f0ff]/30 transition-all p-2 group overflow-hidden">
            <CardBody className="gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">{title}</h3>
                <p className="text-white/50 leading-relaxed font-light">{description}</p>
            </CardBody>
        </Card>
    );
}
