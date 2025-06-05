import { Client } from "@notionhq/client";
import { convertBlocksToMarkdown } from "@/utils/notionMarkdownConverter";
import "server-only";

// Notion APIクライアントの初期化
const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

// NotionのプロダクトデータベースID
const NOTION_PRODUCTS_DATABASE_ID = process.env.NOTION_PRODUCTS_DATABASE_ID || "";

// プロダクト型の定義
export interface Product {
  id: string;
  name: string;
  description: string;
  body: string;
  publishedAt: string;
  heroImage: {
    url: string;
  };
}

// Notionページの型（プロダクト用）
interface NotionPage {
  id: string;
  properties: {
    [key: string]: unknown;
  };
  created_time: string;
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

// NotionページをProduct型に変換するヘルパー関数（軽量版：本文なし）
function convertNotionPageToProductLight(page: NotionPage): Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const name = (page.properties.name as any)?.title?.[0]?.plain_text || "名前なし";
  
  // 説明の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const description = (page.properties.description as any)?.rich_text?.[0]?.plain_text || "";
  
  // 公開日の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publishedAt = (page.properties.publishedAt as any)?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImageFiles = (page.properties.heroImage as any)?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";

  return {
    id: page.id,
    name,
    description,
    body: "", // 一覧表示では本文は空
    publishedAt,
    heroImage: {
      url: heroImageUrl,
    },
  };
}

// NotionページをProduct型に変換するヘルパー関数（完全版：本文あり）
export async function convertNotionPageToProduct(page: NotionPage): Promise<Product> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const name = (page.properties.name as any)?.title?.[0]?.plain_text || "名前なし";
  
  // ページの中身から本文を取得
  const body = await getPageContent(page.id);
  
  // 説明の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const description = (page.properties.description as any)?.rich_text?.[0]?.plain_text || "";
  
  // 公開日の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publishedAt = (page.properties.publishedAt as any)?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroImageFiles = (page.properties.heroImage as any)?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";

  return {
    id: page.id,
    name,
    description,
    body,
    publishedAt,
    heroImage: {
      url: heroImageUrl,
    },
  };
}

// プロダクト一覧を取得（軽量版：本文なし）
export async function getProductList(limit: number = 10): Promise<Product[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_PRODUCTS_DATABASE_ID,
      sorts: [
        {
          property: "publishedAt",
          direction: "descending",
        },
      ],
      page_size: limit,
    });

    // 軽量版で変換（本文取得せず）
    return response.results.map((page: unknown) => convertNotionPageToProductLight(page as NotionPage));
  } catch (error) {
    console.error("Notion APIからのプロダクト取得に失敗しました:", error);
    return [];
  }
}

// 特定のプロダクトを取得（完全版：本文あり）
export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: productId });
    return await convertNotionPageToProduct(page as NotionPage);
  } catch (error) {
    console.error("プロダクトの取得に失敗しました:", error);
    return null;
  }
}
