import { Client } from "@notionhq/client";
import { 
  Blog, 
  NotionPage, 
  NotionBlock, 
  NotionRichText, 
  NotionBlockResponse
} from "@/types";
import { isFullBlock } from "@notionhq/client";
import "server-only";

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// 環境変数の確認
if (!process.env.NOTION_SECRET_KEY) {
  console.error("NOTION_SECRET_KEY が設定されていません");
}
if (!process.env.NOTION_DATABASE_ID) {
  console.error("NOTION_DATABASE_ID が設定されていません");
}

if (process.env.NODE_ENV === 'development') {
  console.log("Notion設定確認:");
  console.log("- NOTION_SECRET_KEY:", process.env.NOTION_SECRET_KEY ? "設定済み" : "未設定");
  console.log("- NOTION_DATABASE_ID:", process.env.NOTION_DATABASE_ID ? "設定済み" : "未設定");
}

// NotionのBlocksをMarkdownに変換
function convertBlocksToMarkdown(blocks: NotionBlockResponse[]): string {
  let markdown = '';
  
  for (const blockResponse of blocks) {
    // 型ガードを使用して完全なブロックかどうかを確認
    if (!isFullBlock(blockResponse)) {
      continue; // パーシャルブロックはスキップ
    }
    
    const block = blockResponse as NotionBlock;
    
    switch (block.type) {
      case 'paragraph':
        const paragraphText = block.paragraph?.rich_text?.map((text: NotionRichText) => {
          let content = text.plain_text || '';
          if (text.annotations?.bold) content = `**${content}**`;
          if (text.annotations?.italic) content = `*${content}*`;
          if (text.annotations?.strikethrough) content = `~~${content}~~`;
          if (text.annotations?.code) content = `\`${content}\``;
          if (text.href) content = `[${content}](${text.href})`;
          return content;
        })
        .join('') || '';
        markdown += `${paragraphText}\n\n`;
        break;
        
      case 'heading_1':
        const h1Text = block.heading_1?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `# ${h1Text}\n\n`;
        break;
        
      case 'heading_2':
        const h2Text = block.heading_2?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `## ${h2Text}\n\n`;
        break;
        
      case 'heading_3':
        const h3Text = block.heading_3?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `### ${h3Text}\n\n`;
        break;
        
      case 'bulleted_list_item':
        const bulletText = block.bulleted_list_item?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `- ${bulletText}\n`;
        break;
        
      case 'numbered_list_item':
        const numberedText = block.numbered_list_item?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `1. ${numberedText}\n`;
        break;
        
      case 'code':
        const codeText = block.code?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        const language = block.code?.language || '';
        markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
        break;
        
      case 'quote':
        const quoteText = block.quote?.rich_text?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `> ${quoteText}\n\n`;
        break;
        
      case 'divider':
        markdown += `---\n\n`;
        break;
        
      case 'image':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageUrl = (block.image as any)?.file?.url || (block.image as any)?.external?.url || '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const caption = (block.image as any)?.caption?.map((text: NotionRichText) => text.plain_text).join('') || '';
        markdown += `![${caption}](${imageUrl})\n\n`;
        break;
        
      default:
        // その他のブロックタイプはプレーンテキストとして扱う
        const blockData = block[block.type as keyof NotionBlock] as { rich_text?: NotionRichText[] };
        if (blockData?.rich_text) {
          const text = blockData.rich_text.map((text: NotionRichText) => text.plain_text).join('');
          if (text.trim()) {
            markdown += `${text}\n\n`;
          }
        }
        break;
    }
  }
  
  return markdown.trim();
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
      database_id: NOTION_DATABASE_ID,
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
    console.error("Notion APIからのブログ記事取得に失敗しました:", error);
    return null;
  }
}

// カテゴリーでフィルタリングしたブログ記事を取得（軽量版：本文なし）
export async function getBlogsByCategory(category: string, limit: number = 100): Promise<Blog[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`カテゴリー検索開始: "${category}"`);
    }
    
    // まず全ての記事を取得してクライアントサイドでフィルタリング
    // これによりNotionのフィルター条件の問題を回避
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

    if (process.env.NODE_ENV === 'development') {
      console.log(`Notion APIレスポンス: ${response.results.length}件の記事を取得`);
    }
    
    // 全記事を変換
    const allBlogs = response.results.map((page: unknown) => convertNotionPageToBlogLight(page as NotionPage));
    
    // クライアントサイドでカテゴリーフィルタリング
    const filteredBlogs = allBlogs.filter(blog => {
      const hasCategory = blog.categories.some(cat => 
        cat.toLowerCase() === category.toLowerCase() ||
        cat === category ||
        decodeURIComponent(cat) === category ||
        encodeURIComponent(cat) === category
      );
      
      if (hasCategory && process.env.NODE_ENV === 'development') {
        console.log(`マッチした記事: "${blog.title}" - カテゴリー: [${blog.categories.join(', ')}]`);
      }
      
      return hasCategory;
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`フィルター後の記事数: ${filteredBlogs.length}`);
      console.log(`検索カテゴリー: "${category}"`);
      console.log(`利用可能な全カテゴリー:`, [...new Set(allBlogs.flatMap(blog => blog.categories))]);
    }
    
    return filteredBlogs;
  } catch (error) {
    console.error("Notion APIからのカテゴリー記事取得に失敗しました:", error);
    return [];
  }
} 