import { Client } from "@notionhq/client";
import { 
  Blog, 
  NotionPage
} from "@/types";
import { convertBlocksToMarkdown } from "@/utils/notionMarkdownConverter";
import "server-only";

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const NOTION_POSTS_DATABASE_ID = process.env.NOTION_POSTS_DATABASE_ID!;

// 環境変数の確認
if (!process.env.NOTION_SECRET_KEY) {
  console.error("NOTION_SECRET_KEY が設定されていません");
}
if (!process.env.NOTION_POSTS_DATABASE_ID) {
  console.error("NOTION_POSTS_DATABASE_ID が設定されていません");
}

if (process.env.NODE_ENV === 'development') {
  console.log("Notion設定確認:");
  console.log("- NOTION_SECRET_KEY:", process.env.NOTION_SECRET_KEY ? "設定済み" : "未設定");
  console.log("- NOTION_POSTS_DATABASE_ID:", process.env.NOTION_POSTS_DATABASE_ID ? "設定済み" : "未設定");
}

// ページの中身（blocks）を取得してMarkdownに変換
async function getPageContent(pageId: string): Promise<string> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    
    return convertBlocksToMarkdown(response.results);
  } catch (error) {
    console.error('ページコンテンツの取得に失敗しました:', error);
    return '';
  }
}

// NotionページをBlog型に変換するヘルパー関数（軽量版：本文なし）
function convertNotionPageToBlogLight(page: NotionPage): Blog {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title = (page.properties.title as any)?.title?.[0]?.plain_text || "タイトルなし";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publishedAt = (page.properties.publishedAt as any)?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImageFiles = (page.properties.heroImage as any)?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";
  
  // カテゴリーの取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = (page.properties.categories as any)?.multi_select?.map((cat: any) => cat.name) || [];

  return {
    id: page.id,
    title,
    body: "", // 一覧表示では本文は空
    publishedAt,
    heroImage: {
      url: heroImageUrl,
    },
    categories,
  };
}

// NotionページをBlog型に変換するヘルパー関数（完全版：本文あり）
export async function convertNotionPageToBlog(page: NotionPage): Promise<Blog> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title = (page.properties.title as any)?.title?.[0]?.plain_text || "タイトルなし";
  
  // ページの中身から本文を取得
  const body = await getPageContent(page.id);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publishedAt = (page.properties.publishedAt as any)?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImageFiles = (page.properties.heroImage as any)?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";
  
  // カテゴリーの取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = (page.properties.categories as any)?.multi_select?.map((cat: any) => cat.name) || [];

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

// ブログ記事一覧を取得（軽量版：本文なし）
export async function getBlogList(limit: number = 10): Promise<Blog[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_POSTS_DATABASE_ID,
      sorts: [
        {
          property: "publishedAt",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    // 軽量版で変換（本文取得せず）
    return response.results.map((page: unknown) => convertNotionPageToBlogLight(page as NotionPage));
  } catch (error) {
    console.error("Notion APIからのブログ記事取得に失敗しました:", error);
    return [];
  }
}

// 単一のブログ記事を取得（完全版：本文あり）
export async function getBlogPost(id: string): Promise<Blog | null> {
  try {
    const response = await notion.pages.retrieve({
      page_id: id,
    });

    return await convertNotionPageToBlog(response as NotionPage);
  } catch (error) {
    console.error("ブログ記事の取得に失敗しました:", error);
    return null;
  }
}

// カテゴリー別でブログ記事を取得
export async function getBlogsByCategory(category: string, limit: number = 100): Promise<Blog[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_POSTS_DATABASE_ID,
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

    // 軽量版で変換（本文取得せず）
    return response.results.map((page: unknown) => convertNotionPageToBlogLight(page as NotionPage));
  } catch (error) {
    console.error(`カテゴリー「${category}」のブログ記事取得に失敗しました:`, error);
    return [];
  }
}

// 全てのカテゴリーを取得
export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_POSTS_DATABASE_ID,
      page_size: 100,
    });

    const allCategories = new Set<string>();
    
    response.results.forEach((page: unknown) => {
      const notionPage = page as NotionPage;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const categories = (notionPage.properties.categories as any)?.multi_select?.map((cat: any) => cat.name) || [];
      categories.forEach((cat: string) => allCategories.add(cat));
    });

    return Array.from(allCategories).sort();
  } catch (error) {
    console.error("カテゴリー一覧の取得に失敗しました:", error);
    return [];
  }
}

// カテゴリー別の記事数を取得
export async function getCategoryCounts(): Promise<{ [key: string]: number }> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_POSTS_DATABASE_ID,
      page_size: 100,
    });

    const categoryCounts: { [key: string]: number } = {};
    
    response.results.forEach((page: unknown) => {
      const notionPage = page as NotionPage;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const categories = (notionPage.properties.categories as any)?.multi_select?.map((cat: any) => cat.name) || [];
      
      categories.forEach((cat: string) => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    });

    return categoryCounts;
  } catch (error) {
    console.error("カテゴリー別記事数の取得に失敗しました:", error);
    return {};
  }
} 