import Image from "next/image";
import { notFound } from "next/navigation";

import { client } from "@/lib/microClient";
import { Blog } from "@/types";

import markdownToHtml from 'zenn-markdown-html';

// サーバーサイドでzenn-markdown-htmlを使用するためのユーティリティ関数
async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // 動的インポートでモジュールを読み込む
    const mod = await import('zenn-markdown-html');
    // defaultエクスポートを使用
    const html = (mod.default as any)(markdown);
    return html;
  } catch (error) {
    console.error('Markdownの変換に失敗しました:', error);
    return markdown; // エラー時は元のMarkdownを返す
  }
}

type Props = {
  blog: Blog;
};

async function getBlogPost(id: string): Promise<Props | null> {
  try {
    const data = await client.get({
      endpoint: "blogs",
      contentId: id,
    });
    return { blog: data };
  } catch (error) {
    console.error("ブログ記事の取得に失敗しました:", error);
    return null;
  }
}

export default async function ArticleDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const blog = await getBlogPost(params.id);

    if (!blog) {
      return notFound();
    }
    
    // Markdownをzenn形式のHTMLに変換
    const htmlContent = await convertMarkdownToHtml(blog.blog.body);

    return (
      <div className="container mx-auto px-4">
        {blog.blog.heroImage && (
          <div className="mb-8">
            <Image
              src={blog.blog.heroImage.url}
              alt={blog.blog.title}
              width={1200}
              height={630}
              className="h-128 w-full rounded-lg object-cover"
            />
          </div>
        )}
        <h1 className="mb-4 text-3xl font-bold">{blog.blog.title}</h1>
        <p className="mb-8 text-gray-500">
          {new Date(blog.blog.publishedAt)
            .toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-")}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="znc max-w-none"
        />
      </div>
    );
  } catch (error) {
    console.error("ブログ記事の表示中にエラーが発生しました:", error);
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    const response = await client.getList({
      endpoint: "blogs",
    });

    return response.contents.map((post: any) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("静的パラメータの生成に失敗しました:", error);
    return [];
  }
}
