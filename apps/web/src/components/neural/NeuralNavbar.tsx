"use client";

import dynamic from "next/dynamic";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button
} from "@heroui/react";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export const NeuralNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: "Market", href: "/market" },
        { name: "Agents", href: "/agents" },
        { name: "Operate", href: "/operate" },
    ];

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="fixed top-6 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-2xl max-w-7xl mx-auto h-16"
            classNames={{
                wrapper: "px-6",
            }}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden text-white"
                />
                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Ghost className="w-6 h-6 text-[#00f0ff]" />
                        </div>
                        <p className="font-black text-2xl text-white tracking-tighter">
                            GHOST<span className="text-white/30 uppercase font-light">Market</span>
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.name} isActive={pathname === item.href}>
                        <Link
                            href={item.href}
                            className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-[#00f0ff] ${pathname === item.href ? "text-[#00f0ff]" : "text-white/50"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <WalletMultiButtonDynamic
                        className="!bg-white/5 !border !border-white/10 !rounded-xl !h-11 !text-sm !font-bold !transition-all hover:!bg-white/10"
                    />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-black/80 backdrop-blur-3xl pt-10 gap-6 border-t border-white/5">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className={`w-full text-2xl font-black uppercase tracking-tighter ${pathname === item.href ? "text-[#00f0ff]" : "text-white/60"
                                }`}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
