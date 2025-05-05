'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Sidebar from "@/components/Sidebar"
import ArcticleContainer from "@/components/ArcticleContainer"
import TopContainer from "../components/TopContainer"
import Breadcumbs from "@/components/Breadcumbs"

import { useState, useEffect } from "react"
import { Blog } from "@/types"
import { client } from "@/lib/microClient"

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await client.getList<Blog>({
        endpoint: "blogs",
        queries: { limit: 10 },
      })
      setBlogs(data.contents)
      console.log("取得したブログ -> ", data.contents.map((blog) => blog.title))
    }
    fetchBlogs()
  }, [])

  return (
    <div className="pt-20 pb-20 text-black dark:text-white bg-white dark:bg-black">
      <TopContainer />
      <div className="flex ml-32 mr-32 gap-10">
        <div>
          <h1 className="text-2xl font-[krok] tracking-wider mb-10 mt-5 text-center">最新の記事</h1>
          <ArcticleContainer blogs={blogs} />
        </div>
        <Sidebar blogs={blogs} />
      </div>
    </div>
  )
}