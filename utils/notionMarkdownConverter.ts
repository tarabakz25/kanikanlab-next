import { isFullBlock } from "@notionhq/client";
import { 
  NotionBlockResponse, 
  NotionBlock, 
  NotionRichText 
} from "@/types";

/**
 * NotionのリッチテキストをMarkdownフォーマットに変換
 */
function formatRichText(richText: NotionRichText[]): string {
  return richText.map((text: NotionRichText) => {
    let content = text.plain_text || '';
    
    // アノテーションの適用
    if (text.annotations?.bold) content = `**${content}**`;
    if (text.annotations?.italic) content = `*${content}*`;
    if (text.annotations?.strikethrough) content = `~~${content}~~`;
    if (text.annotations?.code) content = `\`${content}\``;
    
    // リンクの適用
    if (text.href) content = `[${content}](${text.href})`;
    
    return content;
  }).join('');
}

/**
 * Notionのリッチテキストからプレーンテキストのみを抽出
 */
function extractPlainText(richText: NotionRichText[]): string {
  return richText.map((text: NotionRichText) => text.plain_text).join('');
}

/**
 * NotionのブロックをMarkdownに変換する
 * 
 * @param blocks - Notionブロックの配列
 * @returns Markdown形式の文字列
 */
export function convertBlocksToMarkdown(blocks: NotionBlockResponse[]): string {
  let markdown = '';
  
  for (const blockResponse of blocks) {
    // 型ガードを使用して完全なブロックかどうかを確認
    if (!isFullBlock(blockResponse)) {
      continue; // パーシャルブロックはスキップ
    }
    
    const block = blockResponse as NotionBlock;
    
    switch (block.type) {
      case 'paragraph':
        const paragraphText = block.paragraph?.rich_text 
          ? formatRichText(block.paragraph.rich_text) 
          : '';
        markdown += `${paragraphText}\n\n`;
        break;
        
      case 'heading_1':
        const h1Text = block.heading_1?.rich_text 
          ? extractPlainText(block.heading_1.rich_text)
          : '';
        markdown += `# ${h1Text}\n\n`;
        break;
        
      case 'heading_2':
        const h2Text = block.heading_2?.rich_text 
          ? extractPlainText(block.heading_2.rich_text)
          : '';
        markdown += `## ${h2Text}\n\n`;
        break;
        
      case 'heading_3':
        const h3Text = block.heading_3?.rich_text 
          ? extractPlainText(block.heading_3.rich_text)
          : '';
        markdown += `### ${h3Text}\n\n`;
        break;
        
      case 'bulleted_list_item':
        const bulletText = block.bulleted_list_item?.rich_text 
          ? extractPlainText(block.bulleted_list_item.rich_text)
          : '';
        markdown += `- ${bulletText}\n`;
        break;
        
      case 'numbered_list_item':
        const numberedText = block.numbered_list_item?.rich_text 
          ? extractPlainText(block.numbered_list_item.rich_text)
          : '';
        markdown += `1. ${numberedText}\n`;
        break;
        
      case 'code':
        const codeText = block.code?.rich_text 
          ? extractPlainText(block.code.rich_text)
          : '';
        const language = block.code?.language || '';
        markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
        break;
        
      case 'quote':
        const quoteText = block.quote?.rich_text 
          ? extractPlainText(block.quote.rich_text)
          : '';
        markdown += `> ${quoteText}\n\n`;
        break;
        
      case 'divider':
        markdown += `---\n\n`;
        break;
        
      case 'image':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageUrl = (block.image as any)?.file?.url || (block.image as any)?.external?.url || '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const caption = (block.image as any)?.caption?.length > 0 
          ? extractPlainText((block.image as any).caption as NotionRichText[])
          : '画像';
        markdown += `![${caption}](${imageUrl})\n\n`;
        break;
        
      default:
        // その他のブロックタイプはプレーンテキストとして扱う
        const blockData = block[block.type as keyof NotionBlock] as { rich_text?: NotionRichText[] };
        if (blockData?.rich_text) {
          const text = extractPlainText(blockData.rich_text);
          if (text.trim()) {
            markdown += `${text}\n\n`;
          }
        }
        break;
    }
  }
  
  return markdown.trim();
}

/**
 * 簡易版のブロック変換（any型を受け入れ、基本的なフォーマットのみ）
 * 既存の実装との互換性のため
 */
export function convertBlocksToMarkdownSimple(blocks: any[]): string {
  let markdown = "";

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        if (block.paragraph?.rich_text?.length > 0) {
          markdown += block.paragraph.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        }
        break;
      case "heading_1":
        if (block.heading_1?.rich_text?.length > 0) {
          markdown += "# " + block.heading_1.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        }
        break;
      case "heading_2":
        if (block.heading_2?.rich_text?.length > 0) {
          markdown += "## " + block.heading_2.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        }
        break;
      case "heading_3":
        if (block.heading_3?.rich_text?.length > 0) {
          markdown += "### " + block.heading_3.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        }
        break;
      case "bulleted_list_item":
        if (block.bulleted_list_item?.rich_text?.length > 0) {
          markdown += "- " + block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join("") + "\n";
        }
        break;
      case "numbered_list_item":
        if (block.numbered_list_item?.rich_text?.length > 0) {
          markdown += "1. " + block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join("") + "\n";
        }
        break;
      case "code":
        if (block.code?.rich_text?.length > 0) {
          const language = block.code.language || "";
          const codeText = block.code.rich_text.map((text: any) => text.plain_text).join("");
          markdown += "```" + language + "\n" + codeText + "\n```\n\n";
        }
        break;
      case "quote":
        if (block.quote?.rich_text?.length > 0) {
          markdown += "> " + block.quote.rich_text.map((text: any) => text.plain_text).join("") + "\n\n";
        }
        break;
      case "image":
        const imageUrl = block.image?.file?.url || block.image?.external?.url;
        if (imageUrl) {
          markdown += `![画像](${imageUrl})\n\n`;
        }
        break;
    }
  }
  
  return markdown.trim();
} 