import Sidebar from "@/components/Sidebar";
import ArcticleContainer from "@/components/ArcticleContainer";
import Loading from "@/components/Loading";
import { getBlogList } from "@/lib/notionGetPosts";
import { getAffiliateLinks } from "@/lib/notionGetAffiliateLinks";

export default async function BlogsPage() {
  const [blogs, affiliateProducts] = await Promise.all([
    getBlogList(20),
    getAffiliateLinks()
  ]);

  if (process.env.NODE_ENV === 'development') {
    console.log("ブログページ: 取得したブログ記事数 ->", blogs.length);
    console.log("ブログページ: 取得したアフィリエイト商品数 ->", affiliateProducts.length);
  }

  return (
    <Loading>
      <div>
        <div className="container mx-auto pt-40 pb-20">
          <h1 className="mb-6 text-3xl font-bold">ブログ記事一覧</h1>
        </div>
        <div className="mr-32 mb-20 ml-32 flex gap-10">
          <div className="flex-1">
            <ArcticleContainer blogs={blogs} />
          </div>
          <Sidebar blogs={blogs} affiliateProducts={affiliateProducts} />
        </div>
      </div>
    </Loading>
  );
}
