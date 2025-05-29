import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
// 環境変数からSupabaseのURLとAPIキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabaseクライアントの作成（環境変数が設定されていない場合はnull）
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// いいねテーブルの型定義
export type Like = {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
};

// Supabaseのいいね関連の操作を行うヘルパー関数
export const LikesService = {
  // 投稿のいいね数とユーザーのいいね状態を取得
  async getLikeStatus(postId: string, userId: string) {
    // Supabaseが設定されていない場合はデフォルト値を返す
    if (!supabase) {
      console.warn('Supabaseが設定されていません。いいね機能は無効です。');
      return { count: 0, isLiked: false };
    }

    // いいね数を取得
    const { count: likesCount, error: countError } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (countError) {
      console.error('いいね数取得エラー:', countError);
      return { count: 0, isLiked: false };
    }

    // ユーザーがいいねしているか確認
    const { data: userLike, error: userLikeError } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (userLikeError) {
      console.error('ユーザーいいね確認エラー:', userLikeError);
      return { count: likesCount || 0, isLiked: false };
    }

    return {
      count: likesCount || 0,
      isLiked: !!userLike
    };
  },

  // いいねを追加
  async addLike(postId: string, userId: string) {
    // Supabaseが設定されていない場合はエラーを投げる
    if (!supabase) {
      throw new Error('Supabaseが設定されていません。いいね機能は無効です。');
    }

    const { error } = await supabase
      .from('likes')
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) {
      console.error('いいね追加エラー:', error);
      throw error;
    }

    return await this.getLikeStatus(postId, userId);
  },

  // いいねを削除
  async removeLike(postId: string, userId: string) {
    // Supabaseが設定されていない場合はエラーを投げる
    if (!supabase) {
      throw new Error('Supabaseが設定されていません。いいね機能は無効です。');
    }

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) {
      console.error('いいね削除エラー:', error);
      throw error;
    }

    return await this.getLikeStatus(postId, userId);
  }
}; 