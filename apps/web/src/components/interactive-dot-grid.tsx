"use client";
import { useEffect, useRef } from "react";

export default function InteractiveDotGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Update CSS variables globally on the container for extreme performance
      containerRef.current.style.setProperty("--x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-background"
    >
      {/* LAYER 1: gray grid */}

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50 dark:hidden"
        style={{
          backgroundImage: `radial-gradient(circle at center, #949dab 1.55px, transparent 1.55px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div
        className="pointer-events-none hidden fixed inset-0 z-0 opacity-50 dark:block"
        style={{
          // creates a repeating 1.5px dot every 30px
          backgroundImage: `radial-gradient(circle at center, #212327 1.55px, transparent 1.55px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* LAYER 2: violet highlight grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          // creates the exact same grid, but in Violet
          backgroundImage: `radial-gradient(circle at center, #7f22fe 1.6px, transparent 1.6px)`,
          backgroundSize: "30px 30px",

          // masks this layer so it's only visible in a 250px circle around the mouse
          WebkitMaskImage: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)`,
          maskImage: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)`,
        }}
      />

      {/* LAYER 3: content */}
      <div className="relative z-10 w-full h-full text-foreground">
        {children}
      </div>
    </div>
  );
}
