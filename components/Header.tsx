"use client";
import Image from "next/image";
import * as am from "@/components/Animation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div className="fixed z-100 flex w-full items-center justify-between border-b border-b-gray-300 bg-white px-20 py-6 font-['krok'] text-2xl">
      <a href="/" className="flex items-center gap-5 text-black">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <span>KanikanLab</span>
      </a>
      <div className="flex items-center gap-20 text-black">
        <a href="/about" className="animate-text-underline relative">
          <am.HoverText>About</am.HoverText>
        </a>
        <a href="/blog">
          <am.HoverText>Blog</am.HoverText>
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
