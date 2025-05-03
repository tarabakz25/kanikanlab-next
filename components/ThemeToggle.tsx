"use client";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <FaRegSun className="pt-1 text-2xl transition-all" />
      ) : (
        <FaRegMoon className="pt-1 text-2xl" />
      )}
    </button>
  );
}
