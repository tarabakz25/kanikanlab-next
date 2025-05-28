import { getBlogsByCategory } from "@/lib/notionHelpers";
import Link from "next/link";

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const blogs = await getBlogsByCategory(params.tag);

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">カテゴリー: {params.tag}</h1>
          <p>このカテゴリーの記事はありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">カテゴリー: {params.tag}</h1>
        <div className="space-y-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="border-b pb-8">
              <Link 
                href={`/blog/posts/${blog.id}`}
                className="group block hover:bg-gray-50 p-4 rounded-lg transition-colors"
              >
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                  {blog.title}
                </h2>
                {blog.heroImage.url && (
                  <img 
                    src={blog.heroImage.url} 
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-gray-600 text-sm">
                  {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.categories.map((category) => (
                    <span 
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 