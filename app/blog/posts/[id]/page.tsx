'use client'
import Image from "next/image"
import { notFound } from "next/navigation"
import { useState, useEffect } from "react"

import { client } from "@/lib/microClient"
import { Blog } from "@/types"

import ArticleDetail from "@/components/ArticleDetail"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Sidebar from "@/components/Sidebar"
import Breadcumbs from "@/components/Breadcumbs"
import { title } from "process"

export default async function BlogPost({ params }: { params: { id: string } }) {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const blog = await client.getList<Blog>({
        endpoint: "blogs",
        queries: { filters: `id[equals]${params.id}` },
    })
    setBlogs(blogs)



    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-4">
                <Breadcumbs items={[{ label: 'ホーム', href: '/' }, { label: 'ブログ', href: '/blog' }, { label: `${title}`, href: `/blog/posts/${params.id}` }]} />
            </div>
            <div className="flex ml-32 mr-32 gap-10 mb-20">
                <ArticleDetail params={params} />
                <Sidebar blogs={blogs} />
            </div>
            <Footer />
        </>
    )
}