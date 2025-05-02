import Image from "next/image"
import { notFound } from "next/navigation"

import { client } from "@/lib/microClient"
import { Blog } from "@/types"

type Props = {
    blog: Blog
}

async function getBlogPost(id: string): Promise<Props | null> {
  try {
    const data = await client.get({
      endpoint: "blogs",
      contentId: id,
    })
    return { blog: data }
  } catch (error) {
    console.error("ブログ記事の取得に失敗しました:", error)
    return null
  }
}

export default async function ArticleDetail({ params }: { params: { id: string } }) {
    try {
        const blog = await getBlogPost(params.id)
        
        if (!blog) {
            return notFound()
        }

        return (
            <div className="container mx-auto px-4">
                {blog.blog.heroImage && (
                  <div className="mb-8">
                    <Image 
                      src={blog.blog.heroImage.url} 
                      alt={blog.blog.title} 
                      width={1200} 
                      height={630} 
                      className="rounded-lg h-128 w-full object-cover"
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-4">{blog.blog.title}</h1>
                <p className="text-gray-500 mb-8">{new Date(blog.blog.publishedAt).toLocaleDateString('ja-JP', { 
                  year: 'numeric', month: '2-digit', day: '2-digit' 
                }).replace(/\//g, '-')}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.blog.body }} className="prose max-w-none" />
            </div>
        )
    } catch (error) {
        console.error("ブログ記事の表示中にエラーが発生しました:", error)
        return notFound()
    }
}

export async function generateStaticParams() {
    try {
      const response = await client.getList({
        endpoint: "blogs",
      })
      
      return response.contents.map((post: any) => ({
        id: post.id,
      }))
    } catch (error) {
      console.error("静的パラメータの生成に失敗しました:", error)
      return []
    }
}