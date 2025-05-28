// Blog型
export interface Blog {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  heroImage: {
    url: string;
  };
  categories: string[];
}

// NotionのAPIレスポンス用の基本型をインポート
import { 
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

// ページ応答型（完全版またはパーシャル版）
export type NotionPageResponse = PageObjectResponse | PartialPageObjectResponse;

// ブロック応答型（完全版またはパーシャル版）
export type NotionBlockResponse = BlockObjectResponse | PartialBlockObjectResponse;

// RichTextの型
export type NotionRichTextResponse = RichTextItemResponse;

// 完全版ページ型（プロパティアクセス用）
export type NotionPage = PageObjectResponse;

// 完全版ブロック型（処理用）
export type NotionBlock = BlockObjectResponse;

// リッチテキスト型
export type NotionRichText = RichTextItemResponse;
