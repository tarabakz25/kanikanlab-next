import { NextRequest, NextResponse } from 'next/server';
import { getBlogsByCategory } from '@/lib/notionHelpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`API: カテゴリー検索リクエスト - 元のタグ: "${tag}", デコード後: "${decodedTag}"`);
    }
    
    const blogs = await getBlogsByCategory(decodedTag);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`API: 返却する記事数: ${blogs.length}`);
    }
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('カテゴリー記事の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'カテゴリー記事の取得に失敗しました' },
      { status: 500 }
    );
  }
} 