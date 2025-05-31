import { getBlogPost, getBlogList } from "@/lib/notionGetPosts";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Breadcumbs from "@/components/Breadcumbs";
import ArticleDetail from "@/components/ArticleDetail";
import LikeAndShare from "@/components/LikeAndShare";
import { getAffiliateLinks } from "@/lib/notionGetAffiliateLinks";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const [blog, blogList, affiliateProducts] = await Promise.all([
    getBlogPost(id),
    getBlogList(10),
    getAffiliateLinks()
  ]);

  if (!blog) {
    return notFound();
  }

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
        <Sidebar blogs={blogList} affiliateProducts={affiliateProducts} />
      </div>
    </div>
  );
}
