import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassPanel = ({ children, className, hoverEffect = true }: GlassPanelProps) => {
    return (
        <div
            className={cn(
                "glass-panel rounded-xl p-6 transition-all duration-300",
                hoverEffect && "hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-[rgba(0,240,255,0.3)]",
                className
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
};
