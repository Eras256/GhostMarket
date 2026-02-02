"use client";

import { HeroUIProvider } from "@heroui/react";
import { SolanaProvider } from "@/components/providers/SolanaProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SolanaProvider>
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </SolanaProvider>
    );
}
