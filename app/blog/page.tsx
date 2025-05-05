"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/types";
import { client } from "@/lib/microClient";

import Sidebar from "@/components/Sidebar";
import ArcticleContainer from "@/components/ArcticleContainer";
import Loading from "@/components/Loading";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.getList<Blog>({
          endpoint: "blogs",
          queries: { limit: 20 },
        });
        setBlogs(data.contents);
      } catch (error) {
        console.error("ブログ記事の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Loading>
      <div>
        <div className="container mx-auto pt-40 pb-20">
          <h1 className="mb-6 text-3xl font-bold">ブログ記事一覧</h1>
        </div>
        <div className="mr-32 mb-20 ml-32 flex gap-10">
          <div className="flex-1">
            <ArcticleContainer blogs={blogs} />
          </div>
          <Sidebar blogs={blogs} />
        </div>
      </div>
    </Loading>
  );
}
