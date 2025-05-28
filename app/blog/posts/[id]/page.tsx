import { Blog } from "@/types";
import ArticleDetail from "@/components/ArticleDetail";
import Sidebar from "@/components/Sidebar";
import Breadcumbs from "@/components/Breadcumbs";
import { getBlogPost, getBlogList } from "@/lib/notionHelpers";
import { notFound } from "next/navigation";
import LikeAndShare from "@/components/LikeAndShare";

type PostParams = Promise<{ id: string }>;

export default async function BlogPost({ params }: { params: PostParams }) {
  // paramsを非同期で解決
  const resolvedParams = await params;

  // 現在の記事情報を取得
  const currentBlog = await getBlogPost(resolvedParams.id);
  
  if (!currentBlog) {
    console.error("記事の取得に失敗しました");
    return notFound();
  }

  // サイドバー用のブログ記事一覧を取得
  const blogList = await getBlogList(5);

  return (
    <div>
      <div className="pt-50 mr-32 mb-20 ml-32 flex gap-10">
        <LikeAndShare postId={resolvedParams.id} />
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
        <Sidebar blogs={blogList} />
      </div>
    </div>
  );
}
