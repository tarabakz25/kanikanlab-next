import { getBlogPost, getBlogList } from "@/lib/notionHelpers";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Breadcumbs from "@/components/Breadcumbs";
import ArticleDetail from "@/components/ArticleDetail";
import LikeAndShare from "@/components/LikeAndShare";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    return notFound();
  }

  // サイドバー用のブログ記事一覧を取得
  const blogList = await getBlogList(5);

  return (
    <div>
      <div className="pt-50 mr-32 mb-20 ml-32 flex gap-10">
        <LikeAndShare postId={id} />
        <div>
          <Breadcumbs
            items={[
              { label: "ホーム", href: "/" },
              { label: "ブログ", href: "/blog" },
              {
                label: `${blog.title}`,
                href: `/blog/posts/${id}`,
              },
            ]}
            className="mb-5 pl-5"
          />
          <ArticleDetail params={{ id }} />
        </div>
        <Sidebar blogs={blogList} />
      </div>
    </div>
  );
}
