import { notion, NOTION_DATABASE_ID } from './notionClient';
import { Blog, NotionPage } from '@/types';

// NotionページをBlog型に変換するヘルパー関数
export function convertNotionPageToBlog(page: NotionPage): Blog {
  const title = page.properties.title?.title?.[0]?.plain_text || "タイトルなし";
  const body = page.properties.content?.rich_text?.[0]?.plain_text || "";
  const publishedAt = page.properties.publishedAt?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  const heroImageFiles = page.properties.heroImage?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";
  
  // カテゴリーの取得
  const categories = page.properties.categories?.multi_select?.map(cat => cat.name) || [];

  return {
    id: page.id,
    title,
    body,
    publishedAt,
    heroImage: {
      url: heroImageUrl,
    },
    categories,
  };
}

// ブログ記事一覧を取得
export async function getBlogList(limit: number = 10): Promise<Blog[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          property: "publishedAt",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    return response.results.map((page: any) => convertNotionPageToBlog(page as NotionPage));
  } catch (error) {
    console.error("Notion APIからのブログ記事取得に失敗しました:", error);
    return [];
  }
}

// 単一のブログ記事を取得
export async function getBlogPost(id: string): Promise<Blog | null> {
  try {
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    return convertNotionPageToBlog(response as NotionPage);
  } catch (error) {
    console.error("Notion APIからのブログ記事取得に失敗しました:", error);
    return null;
  }
}

// カテゴリーでフィルタリングしたブログ記事を取得
export async function getBlogsByCategory(category: string, limit: number = 100): Promise<Blog[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "categories",
        multi_select: {
          contains: category,
        },
      },
      sorts: [
        {
          property: "publishedAt",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    return response.results.map((page: any) => convertNotionPageToBlog(page as NotionPage));
  } catch (error) {
    console.error("Notion APIからのカテゴリー記事取得に失敗しました:", error);
    return [];
  }
} 