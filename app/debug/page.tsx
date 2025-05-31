import { getBlogList } from "@/lib/notionHelpers";

export default async function DebugPage() {
  const blogs = await getBlogList(50);
  
  // 全カテゴリーを抽出
  const allCategories = [...new Set(blogs.flatMap(blog => blog.categories))];
  
  return (
    <div className="container mx-auto p-8 pt-40">
      <h1 className="text-3xl font-bold mb-8">デバッグ情報</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">環境変数</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>NOTION_SECRET_KEY: {process.env.NOTION_SECRET_KEY ? "設定済み" : "未設定"}</p>
          <p>NOTION_DATABASE_ID: {process.env.NOTION_DATABASE_ID ? "設定済み" : "未設定"}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">取得した記事数</h2>
        <p className="text-lg">{blogs.length}件</p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">利用可能なカテゴリー</h2>
        <div className="grid grid-cols-3 gap-2">
          {allCategories.map((category, index) => (
            <div key={index} className="bg-blue-100 p-2 rounded">
              <span className="font-medium">{category}</span>
              <br />
              <span className="text-sm text-gray-600">
                エンコード: {encodeURIComponent(category)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">記事一覧</h2>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div key={blog.id} className="border p-4 rounded">
              <h3 className="font-bold">{index + 1}. {blog.title}</h3>
              <p className="text-sm text-gray-600">ID: {blog.id}</p>
              <p className="text-sm text-gray-600">公開日: {blog.publishedAt}</p>
              <div className="mt-2">
                <span className="font-medium">カテゴリー: </span>
                {blog.categories.map((cat, catIndex) => (
                  <span key={catIndex} className="bg-gray-200 px-2 py-1 rounded text-sm mr-1">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 