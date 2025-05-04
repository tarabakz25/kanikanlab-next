"use client";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (resolvedTheme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <FaRegSun className="pt-1 text-2xl transition-all" />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <FaRegMoon className="pt-1 text-2xl transition-all" />
      </button>
    );
  }
}
