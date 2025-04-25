'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="flex justify-between items-center z-100 h-80 w-full bg-whit">
            <a href="/" className="flex items-center gap-10 text-black">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
                <span>KanikanLab</span>
            </a>
            <div className="flex items-center gap-10 text-black">
                <a href="/about">About</a>
                <a href="/blog">Blog</a>
            </div>
        </div>
    )
}