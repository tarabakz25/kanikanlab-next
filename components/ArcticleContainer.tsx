import { GetStaticProps } from "next"
import Image from "next/image"

import { client } from "@/lib/microClient"
import { Blog } from "@/types"
import Tag from "./ui/Tag"

type Props = {
    blogs: Blog[]
}

export default function ArcticleContainer(
    { blogs }: Props
) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
            {blogs.map((blog) => {
                return (
                    <a href={`/blog/posts/${blog.id}`} key={blog.id} className="flex flex-col min-w-96 bg-white rounded-lg overflow-hidden shadow-md transition transform mb-2 hover:shadow-xl hover:transform-y-[-5px]">
                        <div className="relative">
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                                {Array.isArray(blog.categories) 
                                    ? blog.categories.map((cat, idx: number) => (
                                        <Tag tag={cat.category} key={idx} />
                                    ))
                                    : <Tag tag={(blog.categories as {category: string}).category} key="single" />
                                }
                            </div>
                            <Image src={blog.heroImage.url} alt="HEROIMAGE" width={1000} height={1000} className="w-full h-auto object-cover" />
                        </div>
                        <div className="p-1.5 text-left flex flex-col">
                            <p className="text-lg font-bold m-3">{blog.title}</p>
                            <p className="ml-3">{new Date(blog.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const data = await client.getList<Blog>({
        endpoint: "blog",
        queries: {
            limit: 10,
        },
    })
    return {
        props: { blogs: data.contents },
        revalidate: 30,
    }
}