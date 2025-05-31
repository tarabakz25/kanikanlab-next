import Sidebar from "@/components/Sidebar"
import ArcticleContainer from "@/components/ArcticleContainer"
import TopContainer from "../components/TopContainer"
import Loading from "@/components/Loading"
import { getBlogList } from "@/lib/notionGetPosts"
import { getAffiliateLinks } from "@/lib/notionGetAffiliateLinks"

export default async function Home() {
  const [blogs, affiliateProducts] = await Promise.all([
    getBlogList(10),
    getAffiliateLinks()
  ]);

  if (process.env.NODE_ENV === 'development') {
    console.log("ホームページ: 取得したブログ記事数 ->", blogs.length);
    console.log("ホームページ: 記事タイトル ->", blogs.map(blog => blog.title));
    console.log("ホームページ: 取得したアフィリエイト商品数 ->", affiliateProducts.length);
  }

  return (
    <Loading>
      <div className="pt-20 pb-20 text-black dark:text-white bg-white dark:bg-black">
        <TopContainer />
        <div className="flex ml-32 mr-32 gap-10">
          <div>
            <h1 className="text-2xl font-[krok] tracking-wider mb-10 mt-5 text-center">最新の記事</h1>
            <ArcticleContainer blogs={blogs} />
          </div>
          <Sidebar blogs={blogs} affiliateProducts={affiliateProducts} />
        </div>
      </div>
    </Loading>
  )
}