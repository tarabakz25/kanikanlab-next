import { Client } from "@notionhq/client";
import { AffiliateProduct } from "@/types";
import "server-only";

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const NOTION_AFFILIATE_DATABASE_ID = process.env.NOTION_AFFILIATE_DATABASE_ID!;

export async function getAffiliateLinks(): Promise<AffiliateProduct[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_AFFILIATE_DATABASE_ID,
    });

    return response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        title: properties.title?.title?.[0]?.plain_text || "商品名なし",
        url: properties.url?.url || "#",
        description: properties.description?.rich_text?.[0]?.plain_text || "",
        image: properties.image?.files?.[0]?.file?.url || properties.image?.files?.[0]?.external?.url || "",
        price: properties.price?.rich_text?.[0]?.plain_text || "",
      };
    });
  } catch (error) {
    console.error("アフィリエイト商品の取得に失敗しました:", error);
    return [];
  }
}