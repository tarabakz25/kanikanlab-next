import { NextRequest, NextResponse } from 'next/server';
import { getBlogsByCategory } from '@/lib/notionHelpers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    
    const blogs = await getBlogsByCategory(decodedTag);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('カテゴリー記事の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'カテゴリー記事の取得に失敗しました' },
      { status: 500 }
    );
  }
} 