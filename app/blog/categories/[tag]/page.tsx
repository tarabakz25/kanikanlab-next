import { Blog } from "@/types";
import { getBlogsByCategory, getBlogList } from "@/lib/notionHelpers";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ArcticleContainer from "@/components/ArcticleContainer";
import Breadcumbs from "@/components/Breadcumbs";

type CategoryParams = Promise<{ tag: string }>;

export default async function CategoryPage({
  params,
}: {
  params: CategoryParams;
}) {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.tag);

  // カテゴリーに属する記事を取得
  let blogs;
  try {
    blogs = await getBlogsByCategory(category, 100);
  } catch (error) {
    console.error("カテゴリー記事の取得に失敗しました:", error);
    return notFound();
  }

  // サイドバー用の最新記事を取得
  const recentBlogs = await getBlogList(5);

  return (
    <div>
      <div className="container mx-auto pt-40 pb-20">
        <Breadcumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: "ブログ", href: "/blog" },
            { label: "カテゴリー一覧", href: "" },
            { label: category, href: `/blog/categories/${resolvedParams.tag}` },
          ]}
          className="mb-5"
        />
        <h1 className="mb-6 text-3xl font-bold">カテゴリー: {category}</h1>
      </div>
      <div className="mr-32 mb-20 ml-32 flex gap-10">
        <div className="flex-1">
          {blogs.length > 0 ? (
            <ArcticleContainer blogs={blogs} />
          ) : (
            <p>このカテゴリーの記事はまだありません。</p>
          )}
        </div>
        <Sidebar blogs={recentBlogs} />
      </div>
    </div>
  );
} 