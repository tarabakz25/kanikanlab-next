import { GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"

import { client } from "@/lib/microClient"
import { Blog } from "@/types"

import Error404 from "@/components/error/Error404"

import { markdownToHtml } from "zenn-markdown-html"


type Props = {
    blog: Blog & { body: string }
}

export default function Post({ blog }: Props) {
    const router = useRouter()
    if(!router.isFallback && !blog) { 
        return (
            <Error404 />
        )
    }
    const html = markdownToHtml(blog.body)

    return (
        <article className="znc">
            <div>
                <Image src={blog.heroImage.url} width={800} height={450} alt={blog.title} />
            </div>
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.publishedAt}</p>
                <div>
                    {blog.categories.map((cat, idx) => (
                        <span key={idx}>{cat.category}</span>
                    ))}
                </div>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </article>
    )
}

export const getStaticPaths = async () => {
    const data = await client.getList({
        endpoint: "blog",
        queries: { limit: 100 }
    })
    const paths = data.contents.map((content: any) => ({
        params: { id: content.id } 
    }))
    return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await client.getListDetail<Blog>({
        endpoint: "blog",
        contentId: params!.id as string,
    })
    return {
        props: { blog: data },
        revalidate: 60,
    }
}