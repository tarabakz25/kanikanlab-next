import Image from "next/image";
import { notFound } from "next/navigation";

import { getBlogPost, getBlogList } from "@/lib/notionGetPosts";
import { Blog } from "@/types";

// サーバーサイドでzenn-markdown-htmlを使用するためのユーティリティ関数
async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    // 動的インポートでモジュールを読み込む
    const mod = await import('zenn-markdown-html');
    // defaultエクスポートを使用
    const markdownConverter = mod.default as unknown as (markdown: string, options?: { embedOrigin?: string }) => string;
    const html = markdownConverter(markdown, {
      embedOrigin: "https://embed.zenn.studio"
    });
    return html;
  } catch (error) {
    console.error('Markdownの変換に失敗しました:', error);
    return markdown; // エラー時は元のMarkdownを返す
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
    const htmlContent = await convertMarkdownToHtml(blog.body);

    return (
      <div className="container mx-auto px-4">
        {blog.heroImage && blog.heroImage.url && (
          <div className="mb-8">
            <Image
              src={blog.heroImage.url}
              alt={blog.title}
              width={1200}
              height={630}
              className="h-128 w-full rounded-lg object-cover"
            />
          </div>
        )}
        <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
        
        {/* カテゴリー表示 */}
        {blog.categories && blog.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {blog.categories.map((category) => (
              <span 
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <p className="mb-8 text-gray-500">
          {new Date(blog.publishedAt)
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
    const blogs = await getBlogList(100); // より多くの記事を取得

    return blogs.map((blog: Blog) => ({
      id: blog.id,
    }));
  } catch (error) {
    console.error("静的パラメータの生成に失敗しました:", error);
    return [];
  }
}
