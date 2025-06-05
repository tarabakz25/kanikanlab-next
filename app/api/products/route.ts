import { NextResponse } from 'next/server';
import { getProductList } from '@/lib/notion';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    const products = await getProductList(limit ? parseInt(limit) : 10);
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('プロダクト一覧の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロダクト一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
} 