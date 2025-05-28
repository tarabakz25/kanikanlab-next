import { Client } from "@notionhq/client";
import "server-only";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getNotionData() {
  return fetch(
    'https://api.notion.com/v1/databases/' + process.env.NEXT_PUBLIC_NOTION_DATABASE_ID + '/query',
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