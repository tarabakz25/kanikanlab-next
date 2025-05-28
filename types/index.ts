export type Blog = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  heroImage: {
    url: string;
    height?: number;
    width?: number;
  };
  categories: string[];
};

// Notion API用の型定義
export type NotionPage = {
  id: string;
  properties: {
    title?: {
      title: Array<{
        plain_text: string;
      }>;
    };
    content?: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    publishedAt?: {
      date?: {
        start: string;
      };
    };
    heroImage?: {
      files: Array<{
        file?: {
          url: string;
        };
        external?: {
          url: string;
        };
      }>;
    };
    categories?: {
      multi_select: Array<{
        name: string;
      }>;
    };
  };
  created_time: string;
};
