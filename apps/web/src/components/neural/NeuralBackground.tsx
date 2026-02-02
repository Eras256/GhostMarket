"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function Stars(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const data = new Float32Array(8000 * 3); // More stars for density
        return random.inSphere(data, { radius: 1.5 });
    });

    useFrame((state, delta) => {
        if (ref.current) {
            // Complex orbital motion
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 25;
            ref.current.position.y = Math.sin(state.clock.elapsedTime / 4) * 0.05;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f0ff"
                    size={0.0015} // Smaller, sharper stars
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={2} // Additive blending
                />
            </Points>
        </group>
    );
}

function Connections() {
    // Advanced connection lines could go here, but for performance in a simple setup, 
    // we keep it clean or use a LineSegments implementation if requested.
    // For "Max Animation", subtle floating particles are often more "premium" than messy lines.
    return null;
}

export const NeuralBackground = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#050508]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
            {/* Noise Overlay */}
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 pointer-events-none" />
        </div>
    );
};

