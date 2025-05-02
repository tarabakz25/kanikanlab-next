import { Blog } from "@/types"
import ArticleDetail from "@/components/ArticleDetail"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Sidebar from "@/components/Sidebar"
import Breadcumbs from "@/components/Breadcumbs"
import { client } from "@/lib/microClient"
import { notFound } from "next/navigation"
import LikeAndShare from "@/components/LikeAndShare"

export default async function BlogPost({ params }: { params: { id: string } }) {
    // paramsを非同期で解決
    const resolvedParams = await params;
    
    // 現在の記事情報を取得
    let currentBlog;
    try {
        currentBlog = await client.get({
            endpoint: "blogs",
            contentId: resolvedParams.id
        });
    } catch (error) {
        console.error("記事の取得に失敗しました:", error);
        return notFound();
    }

    // サイドバー用のブログ記事一覧を取得
    const blogList = await client.getList<Blog>({
        endpoint: "blogs",
        queries: { limit: 5 }
    })

    return (
        <>
            <Header />
            <div className="container mx-auto pl-50 mt-18 mb-5">
                <Breadcumbs items={[
                    { label: 'ホーム', href: '/' }, 
                    { label: 'ブログ', href: '/blog' }, 
                    { label: `${currentBlog.title}`, href: `/blog/posts/${resolvedParams.id}` }
                ]} />
            </div>
            <div className="flex ml-32 mr-32 gap-10 mb-20">
                <LikeAndShare />
                <ArticleDetail params={resolvedParams} />
                <Sidebar blogs={blogList.contents} />
            </div>
            <Footer />
        </>
    )
}