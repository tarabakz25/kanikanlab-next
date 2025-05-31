import { NextRequest, NextResponse } from 'next/server';
import { getBlogList } from '@/lib/notionGetPosts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const blogs = await getBlogList(limit);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'ブログ記事の取得に失敗しました' },
      { status: 500 }
    );
  }
} 