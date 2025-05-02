import Image from 'next/image'
import { FaTwitter, FaGithub, FaTag } from 'react-icons/fa'

import { Blog } from '@/types'

type Props = {
    blogs: Blog[]
}


export default function Sidebar(
    { blogs }: Props
) {
    return (
        <div className="flex flex-col gap-2">
            <div className="bg-white flex flex-col items-center gap-2 rounded-lg shadow-md w-72 p-4">
                <Image src="/WriterIcon.png" alt="logo" width={500} height={500} className="rounded-full w-20 h-auto" />
                <p className="text-2xl font-bold font-[anonymous-pro]">Kizuki</p>
                <p>
                    神山まるごと高専一期生。 東京→徳島
                    旅行、生成AI、テクノロジーを追って日々精進中。
                    主にプログラミング、生成AIに関する情報を発信中。時々趣味の話が上がるかも？
                </p>
                <p className="mt-3 font-[krok] tracking-wider">\ Follow me! /</p>
                <div className="flex flex-row gap-5 mb-3">
                    <a href="https://x.com/kz25_kmc" className="text-2xl transition-all hover:text-blue-600"><FaTwitter /></a>
                    <a href="https://github.com/tarabakz25" className="text-2xl transition-all hover:text-blue-600"><FaGithub /></a>
                </div>
            </div>
            <div className="flex flex-col items-center rounded-2xl shadow-lg p-2 pt-5 pb-5">
                <h3 className="text-2xl font-[krok] tracking-wider mb-10 mt-5">Category</h3>
                <ul className="flex flex-col gap-5 list-none h-full text-left">
                    {blogs.map((blog, blogIndex) => {
                        return (
                            Array.isArray(blog.categories)
                                ? blog.categories.map((cat, idx: number) => (
                                    <li key={`${blogIndex}-${idx}`}>
                                        <a href={`/blog/categories/${cat.category}`} className="block decoration-none relative pl-3">
                                            <FaTag className="absolute top-1.5 left-[-0.5rem] " />
                                            {cat.category}
                                        </a>
                                    </li>
                                ))
                                : <li key={`single-${blogIndex}`}>
                                    <a href={`/blog/categories/${(blog.categories as { category: string }).category}`} className="block decoration-none relative pl-3">
                                        <FaTag className="absolute top-1.5 left-[-0.5rem]" />
                                        {(blog.categories as { category: string }).category}
                                    </a>
                                </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}