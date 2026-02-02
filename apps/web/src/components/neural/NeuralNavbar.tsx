"use client";

import dynamic from "next/dynamic";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
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
            isMenuOpen={isMenuOpen}
            maxWidth="xl"
            position="sticky"
            className="fixed top-2 md:top-6 bg-black/20 border border-white/5 backdrop-blur-2xl rounded-xl md:rounded-2xl w-[95%] mx-auto h-auto min-h-[64px] z-[100]"
            classNames={{
                wrapper: "px-4 md:px-6 h-16 md:h-20",
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-[#00f0ff]",
                ],
            }}
        >
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link href="/" className="flex justify-start items-center gap-2 md:gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Ghost className="w-5 h-5 md:w-6 md:h-6 text-[#00f0ff]" />
                        </div>
                        <p className="font-black text-xl md:text-2xl text-white tracking-tighter">
                            GHOST<span className="text-white/30 uppercase font-light hidden xs:inline">Market</span>
                        </p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8 md:gap-10" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.name} isActive={pathname === item.href}>
                        <Link
                            href={item.href}
                            className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-[#00f0ff] ${pathname === item.href ? "text-[#00f0ff]" : "text-white/50"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="flex gap-2">
                    <div className="hidden xs:block">
                        <WalletMultiButtonDynamic
                            className="!bg-[#00f0ff]/10 !border !border-[#00f0ff]/20 !text-[#00f0ff] !rounded-lg md:!rounded-xl !h-10 md:!h-11 !text-xs !font-bold !transition-all hover:!bg-[#00f0ff]/20"
                        />
                    </div>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden text-white"
                    />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-black/95 backdrop-blur-3xl pt-12 px-6 gap-8 border-t border-white/5 mt-2">
                <div className="flex flex-col gap-6">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.name}-${index}`}>
                            <Link
                                className={`w-full text-4xl font-black uppercase tracking-tighter transition-all ${pathname === item.href ? "text-[#00f0ff]" : "text-white/40 hover:text-white"
                                    }`}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    <div className="pt-8 border-t border-white/10 mt-4 block xs:hidden">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 block">Secure Connection</span>
                        <WalletMultiButtonDynamic
                            className="!w-full !bg-[#00f0ff] !text-black !rounded-xl !h-14 !text-sm !font-black"
                        />
                    </div>
                </div>
                <div className="mt-auto pb-12">
                    <p className="text-white/20 text-[10px] font-mono">GHOST_PROTOCOL_V2.4 // NODE_CONNECTED</p>
                </div>
            </NavbarMenu>
        </Navbar>
    );
};
