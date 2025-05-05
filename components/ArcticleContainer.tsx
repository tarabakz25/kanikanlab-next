import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { client } from "@/lib/microClient";
import { Blog } from "@/types";
import Tag from "./ui/Tag";

type Props = {
  blogs: Blog[];
};

export default function ArcticleContainer({ blogs }: Props) {
  return (
    <div className="m-auto grid grid-cols-1 gap-4 md:grid-cols-2">
      {blogs.map((blog) => {
        return (
          <Link
            href={`/blog/posts/${blog.id}`}
            key={blog.id}
            className="mb-2 flex transform flex-col overflow-hidden rounded-lg shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
          >
            <div className="relative">
              <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1.5">
                {Array.isArray(blog.categories) ? (
                  blog.categories.map((cat, idx: number) => (
                    <Tag tag={cat} key={idx} />
                  ))
                ) : (
                  <Tag tag={blog.categories[0]} key="single" />
                )}
              </div>
              <Image
                src={blog.heroImage?.url || ""}
                alt={blog.title}
                width={1000}
                height={1000}
                className="h-72 w-128 object-cover"
                priority
              />
            </div>
            <div className="flex flex-col p-1.5 text-left">
              <h2 className="m-3 line-clamp-2 text-lg font-bold text-color">
                {blog.title}
              </h2>
              <p className="ml-3 text-gray-500 dark:text-gray-400">
                {new Date(blog.publishedAt)
                  .toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\//g, "-")}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blogs",
    queries: {
      limit: 10,
    },
  });
  return {
    props: { blogs: data.contents },
    revalidate: 30,
  };
};
