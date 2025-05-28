'use client'
import Sidebar from "@/components/Sidebar"
import ArcticleContainer from "@/components/ArcticleContainer"
import TopContainer from "../components/TopContainer"
import Loading from "@/components/Loading"

import { useState, useEffect } from "react"
import { Blog } from "@/types"
import { getBlogList } from "@/lib/notionHelpers"

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogList(10)
        setBlogs(data)
        console.log("取得したブログ -> ", data.map((blog) => blog.title))
      } catch (error) {
        console.error("ブログ記事の取得に失敗しました:", error)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <Loading>
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
    </Loading>
  )
}