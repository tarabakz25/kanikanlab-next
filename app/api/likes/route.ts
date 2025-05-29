import { NextRequest, NextResponse } from 'next/server';
import { LikesService } from '@/lib/supabase';

// いいね情報を取得
export async function GET(request: NextRequest) {
  try {
    const postId = request.nextUrl.searchParams.get('postId');
    const userId = request.nextUrl.searchParams.get('userId');

    if (!postId || !userId) {
      return NextResponse.json(
        { error: '記事IDとユーザーIDが必要です' },
        { status: 400 }
      );
    }

    const likeStatus = await LikesService.getLikeStatus(postId, userId);
    
    return NextResponse.json(likeStatus);
  } catch (error) {
    console.error('いいね情報取得エラー:', error);
    return NextResponse.json(
      { error: 'いいね情報の取得に失敗しました', },
      { status: 500 }
    );
  }
}

// いいねを追加/削除
export async function POST(request: NextRequest) {
  try {
    const { postId, userId, action } = await request.json();

    if (!postId || !userId || !action) {
      return NextResponse.json(
        { error: '記事ID、ユーザーID、アクションが必要です' },
        { status: 400 }
      );
    }

    let result;
    
    // いいねの追加または削除
    if (action === 'like') {
      result = await LikesService.addLike(postId, userId);
    } else if (action === 'unlike') {
      result = await LikesService.removeLike(postId, userId);
    } else {
      return NextResponse.json(
        { error: 'アクションは "like" または "unlike" である必要があります' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('いいね処理エラー:', error);
    return NextResponse.json(
      { error: 'いいね処理に失敗しました' },
      { status: 500 }
    );
  }
} 