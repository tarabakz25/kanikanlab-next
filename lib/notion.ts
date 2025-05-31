import { Client } from "@notionhq/client";
import "server-only";

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

export async function getNotionPostsData() {
  return fetch(
    'https://api.notion.com/v1/databases/' + process.env.NOTION_POSTS_DATABASE_ID + '/query',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: {}
        }
      }),
    }
  ).then((res) => res.json());
}

export async function getNotionDataByPageId(pageId: string) {
  return notion.blocks.children.list({
    block_id: pageId,
  })
}

export async function getNotionAffiliateData() {
  return fetch(
    'https://api.notion.com/v1/databases/' + process.env.NOTION_AFFILIATE_DATABASE_ID + '/query',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
}