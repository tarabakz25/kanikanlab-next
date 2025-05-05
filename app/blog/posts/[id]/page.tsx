import { Blog } from "@/types";
import ArticleDetail from "@/components/ArticleDetail";
import Sidebar from "@/components/Sidebar";
import Breadcumbs from "@/components/Breadcumbs";
import { client } from "@/lib/microClient";
import { notFound } from "next/navigation";
import LikeAndShare from "@/components/LikeAndShare";

type PostParams = Promise<{ id: string }>;

export default async function BlogPost({ params }: { params: PostParams }) {
  // paramsを非同期で解決
  const resolvedParams = await params;

  // 現在の記事情報を取得
  let currentBlog;
  try {
    currentBlog = await client.get({
      endpoint: "blogs",
      contentId: resolvedParams.id,
    });
  } catch (error) {
    console.error("記事の取得に失敗しました:", error);
    return notFound();
  }

  // サイドバー用のブログ記事一覧を取得
  const blogList = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { limit: 5 },
  });

  return (
    <div>
      <div className="pt-50 mr-32 mb-20 ml-32 flex gap-10">
        <LikeAndShare />
        <div>
          <Breadcumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ブログ", href: "/blog" },
              {
                label: `${currentBlog.title}`,
                href: `/blog/posts/${resolvedParams.id}`,
              },
            ]}
            className="mb-5 pl-5"
          />
          <ArticleDetail params={resolvedParams} />
        </div>
        <Sidebar blogs={blogList.contents} />
      </div>
    </div>
  );
}
