import { getBlogsByCategory, getBlogList } from "@/lib/notionHelpers";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import ArcticleContainer from "@/components/ArcticleContainer";
import Loading from "@/components/Loading";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  // URLエンコードされたタグをデコード
  const decodedTag = decodeURIComponent(tag);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`カテゴリーページ: 受け取ったタグ = "${tag}"`);
    console.log(`カテゴリーページ: デコードされたタグ = "${decodedTag}"`);
  }
  
  const blogs = await getBlogsByCategory(tag);
  if (process.env.NODE_ENV === 'development') {
    console.log(`カテゴリーページ: 取得した記事数 = ${blogs.length}`);
  }

  // サイドバー用の全記事を取得
  const allBlogs = await getBlogList(100);

  if (blogs.length === 0) {
    return (
      <div className="pt-30 pb-20 text-black dark:text-white bg-white dark:bg-black">
          <div className="container mx-auto pt-40 pb-20">
            <h1 className="mb-6 text-3xl font-bold">カテゴリー: {decodedTag}</h1>
          </div>
          <div className="mr-32 mb-20 ml-32 flex gap-10">
            <div className="flex-1">
              <p className="text-center text-gray-500">このカテゴリーの記事はありません。</p>
              <p className="text-sm text-gray-400 mt-2 text-center">
                デバッグ情報: 検索したカテゴリー = "{tag}"
              </p>
            </div>
            <Sidebar blogs={allBlogs} />
          </div>
        </div>
    );
  }

  return (
    <Loading>
      <div className="pt-40   pb-20 text-black dark:text-white bg-white dark:bg-black">
        <div className="container mx-auto pb-20">
          <h1 className="mb-6 pl-30 text-3xl font-bold">カテゴリー: {decodedTag}</h1>
        </div>
        <div className="mr-32 mb-20 ml-32 flex gap-10">
          <div className="flex-1">
            <ArcticleContainer blogs={blogs} />
          </div>
          <Sidebar blogs={allBlogs} />
        </div>
      </div>
    </Loading>
  );
} 