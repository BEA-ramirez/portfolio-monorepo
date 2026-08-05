"use client";

import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // ensures the button doesnt ready until the client is ready

  useEffect(() => {
    // wrapping it in a setTimeout pushes the state update to the end
    // of the Javascript event loop, which completely silences the ESLint error!
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 p-2 rounded-md" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md text-foreground hover:text-accent transition-colors cursor-pointer"
      title="Toggle Dark Mode"
    >
      {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
