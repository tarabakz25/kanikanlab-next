"use client";
import Image from "next/image";
import { HoverTextHeader } from "@/components/Animation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div className="fixed z-40 flex w-full items-center justify-between border-b dark:bg-gray-900 border-b-gray-300 dark:border-b-gray-700 px-20 py-6 font-['krok'] text-2xl">
      <a href="/" className="flex items-center gap-5 ">
        <Image
          src="/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="dark:invert"
        />
        <span className="">KanikanLab</span>
      </a>
      <div className="flex items-center gap-20">
        <a href="/about" className="animate-text-underline relative">
          <HoverTextHeader>About</HoverTextHeader>
        </a>
        <a href="/blog">
          <HoverTextHeader>Blog</HoverTextHeader>
        </a>
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
}
