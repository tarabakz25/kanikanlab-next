import { notion, NOTION_DATABASE_ID } from './notionClient';
import { Blog, NotionPage } from '@/types';

// Notion blocks をMarkdownに変換するヘルパー関数
function convertBlocksToMarkdown(blocks: any[]): string {
  let markdown = '';
  
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        const paragraphText = block.paragraph.rich_text
          .map((text: any) => {
            let content = text.plain_text;
            if (text.annotations.bold) content = `**${content}**`;
            if (text.annotations.italic) content = `*${content}*`;
            if (text.annotations.code) content = `\`${content}\``;
            if (text.href) content = `[${content}](${text.href})`;
            return content;
          })
          .join('');
        markdown += `${paragraphText}\n\n`;
        break;
        
      case 'heading_1':
        const h1Text = block.heading_1.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `# ${h1Text}\n\n`;
        break;
        
      case 'heading_2':
        const h2Text = block.heading_2.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `## ${h2Text}\n\n`;
        break;
        
      case 'heading_3':
        const h3Text = block.heading_3.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `### ${h3Text}\n\n`;
        break;
        
      case 'bulleted_list_item':
        const bulletText = block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `- ${bulletText}\n`;
        break;
        
      case 'numbered_list_item':
        const numberedText = block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `1. ${numberedText}\n`;
        break;
        
      case 'code':
        const codeText = block.code.rich_text.map((text: any) => text.plain_text).join('');
        const language = block.code.language || '';
        markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
        break;
        
      case 'quote':
        const quoteText = block.quote.rich_text.map((text: any) => text.plain_text).join('');
        markdown += `> ${quoteText}\n\n`;
        break;
        
      case 'divider':
        markdown += `---\n\n`;
        break;
        
      case 'image':
        const imageUrl = block.image.file?.url || block.image.external?.url || '';
        const caption = block.image.caption?.map((text: any) => text.plain_text).join('') || '';
        markdown += `![${caption}](${imageUrl})\n\n`;
        break;
        
      default:
        // その他のブロックタイプはプレーンテキストとして扱う
        if (block[block.type]?.rich_text) {
          const text = block[block.type].rich_text.map((text: any) => text.plain_text).join('');
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
  const title = page.properties.title?.title?.[0]?.plain_text || "タイトルなし";
  const publishedAt = page.properties.publishedAt?.date?.start || page.created_time;
  
  // ヒーロー画像の取得
  const heroImageFiles = page.properties.heroImage?.files || [];
  const heroImageUrl = heroImageFiles[0]?.file?.url || heroImageFiles[0]?.external?.url || "";
  
  // カテゴリーの取得
  const categories = page.properties.categories?.multi_select?.map(cat => cat.name) || [];

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
  const title = page.properties.title?.title?.[0]?.plain_text || "タイトルなし";
  
  // ページの中身から本文を取得
  const body = await getPageContent(page.id);
  
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
    return response.results.map((page: any) => convertNotionPageToBlogLight(page as NotionPage));
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

    // 軽量版で変換（本文取得せず）
    return response.results.map((page: any) => convertNotionPageToBlogLight(page as NotionPage));
  } catch (error) {
    console.error("Notion APIからのカテゴリー記事取得に失敗しました:", error);
    return [];
  }
} 