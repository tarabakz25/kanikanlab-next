"use client";
import Image from "next/image";
import { HoverTextHeader } from "@/components/Animation";
import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed z-40 flex w-full items-center justify-between px-20 py-6 font-['krok'] text-2xl backdrop-blur-md  bg-opacity-80  dark:bg-opacity-80">
      <Link href="/" className="flex items-center gap-5 ">
        <Image
          src="/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="dark:invert"
        />
        <span className="">KanikanLab</span>
      </Link>
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
