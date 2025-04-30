'use client'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? 
            <FaRegSun className="text-2xl pt-1 transition-all " /> : 
            <FaRegMoon className="text-2xl pt-1" />}
        </button>
    )
}