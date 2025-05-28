import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || ""; 