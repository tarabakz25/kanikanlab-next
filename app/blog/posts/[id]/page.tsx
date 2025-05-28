import { getBlogPost } from "@/lib/notionHelpers";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-8">
          {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
        </p>
        
        {blog.heroImage.url && (
          <img 
            src={blog.heroImage.url} 
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {blog.categories.map((category) => (
            <span 
              key={category}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded"
            >
              {category}
            </span>
          ))}
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: blog.body.replace(/\n/g, '<br/>') 
          }}
        />
      </div>
    </div>
  );
}
