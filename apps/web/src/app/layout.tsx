import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NeuralNavbar } from "@/components/neural/NeuralNavbar";
import { NeuralBackground } from "@/components/neural/NeuralBackground";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GhostMarket | Autonomous Agent Dark Pool",
    description: "Privacy-preserving execution layer for AI Agents on Solana. Powered by Arcium and Privacy Cash.",
};

import { Toaster } from "sonner";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} selection:bg-[#00f0ff]/30`}>
                <Providers>
                    <Toaster position="top-right" theme="dark" closeButton richColors />
                    <NeuralBackground />
                    <NeuralNavbar />
                    <main className="relative z-10 pt-32 min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
