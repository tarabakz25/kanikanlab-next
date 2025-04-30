'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Sidebar from "@/components/Sidebar"
import ArcticleContainer from "@/components/ArcticleContainer"

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
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <ArcticleContainer blogs={blogs} />
      </div>
      <Footer />
    </div>
  )
}