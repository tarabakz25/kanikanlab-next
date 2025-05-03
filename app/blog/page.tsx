"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/types";
import { client } from "@/lib/microClient";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ArcticleContainer from "@/components/ArcticleContainer";
import Breadcumbs from "@/components/Breadcumbs";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await client.getList<Blog>({
        endpoint: "blogs",
        queries: { limit: 20 },
      });
      setBlogs(data.contents);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <h1 className="mb-6 text-3xl font-bold">ブログ記事一覧</h1>
      </div>
      <div className="mr-32 mb-20 ml-32 flex gap-10">
        <div className="flex-1">
          <ArcticleContainer blogs={blogs} />
        </div>
        <Sidebar blogs={blogs} />
      </div>
      <Footer />
    </div>
  );
}
