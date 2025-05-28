# Notion API セットアップガイド

このプロジェクトをNotion APIと連携させるための設定手順です。

## 1. Notion Integration の作成

1. [Notion Developers](https://www.notion.so/my-integrations) にアクセス
2. 「New integration」をクリック
3. 以下の情報を入力：
   - **Name**: 任意の名前（例：My Blog Integration）
   - **Associated workspace**: ブログデータが入っているワークスペースを選択
   - **Type**: Internal
4. 「Submit」をクリック
5. 生成された「Internal Integration Secret」をコピー

## 2. データベースの共有設定

1. Notionでブログ記事が入っているデータベースページを開く
2. ページ右上の「Share」ボタンをクリック
3. 作成したIntegrationを検索して選択
4. 「Invite」をクリック

## 3. データベースIDの取得

データベースのURLから以下の部分をコピー：
```
https://www.notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyyyyyy
```
`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` の部分がデータベースIDです。

## 4. 環境変数の設定

`.env.local` ファイルを作成し、以下を設定：

```env
# Notion API設定
NOTION_SECRET_KEY=secret_xxxxxxxxxx（上記で取得したIntegration Secret）
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx（上記で取得したデータベースID）

# その他の環境変数（既存）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADOBE_FONTS_KIT_ID=your_adobe_fonts_kit_id
```

## 5. Notionデータベースの構造

データベースには以下のプロパティが必要です：

| プロパティ名 | タイプ | 説明 |
|-------------|--------|------|
| title | Title | 記事のタイトル |
| content | Rich text | 記事の本文（Markdown形式） |
| publishedAt | Date | 公開日 |
| heroImage | Files & media | アイキャッチ画像 |
| categories | Multi-select | カテゴリー |

## 6. 画像の設定

- `next.config.ts` で `domains` に Notion の画像ドメインを追加：

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
};
```

これで設定完了です！ 