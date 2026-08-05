"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      containerRef.current.style.setProperty("--x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gray-950 overflow-hidden"
    >
      {/* Layer 1 : hidden bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1780725104157-48ea75f089fc?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  bg-center opacity-40 transition-opacity duration-300"
        style={{
          WebkitMaskImage: `radial-gradient(100px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)`,
          maskImage: `radial-gradient(160px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)`,
        }}
      />

      {/* Layer 2 : subtle glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(139, 92, 246, 0.1), transparent 100%)`,
        }}
      />

      {/* Layer 3 : content */}
      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
}
