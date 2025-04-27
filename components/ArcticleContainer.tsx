import { GetStaticProps } from "next"
import Image from "next/image"

import { client } from "@/lib/microClient"
import { Blog } from "@/types"

type Props = {
    blogs: Blog[]
}

export default function ArcticleContainer(
    { blogs }: Props
) {
    return (
        <div>
            {blogs.map((blog) => {
                return (
                    <div>
                        <div>
                            <div>
                                {blog.categories.map((cat, idx) => (
                                    <span key={idx}>{cat.category}</span>
                                ))}
                            </div>
                            <Image src={blog.heroImage.url} alt="HEROIMAGE" width={300} height={600} />
                        </div>
                        <div>
                            <p>{blog.title}</p>
                            <p>{blog.publishedAt}</p>
                        </div>
                    </div>
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