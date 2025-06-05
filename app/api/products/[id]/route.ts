import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/notion';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProduct(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'プロダクトが見つかりませんでした' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error('プロダクトの取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロダクトの取得に失敗しました' },
      { status: 500 }
    );
  }
} 