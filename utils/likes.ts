// ユーザーIDの生成（実際の認証システムに置き換えるべき）
export const getUserId = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  
  // ローカルストレージからユーザーIDを取得
  const storedUserId = localStorage.getItem('userId');
  
  // 存在しない場合は新しいIDを生成して保存
  if (!storedUserId) {
    const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newUserId);
    return newUserId;
  }
  
  return storedUserId;
};

// いいねのAPI関数
export const fetchLikeStatus = async (postId: string): Promise<{ count: number; isLiked: boolean }> => {
  try {
    const userId = getUserId();
    
    if (!userId || !postId) {
      return { count: 0, isLiked: false };
    }
    
    const response = await fetch(`/api/likes?postId=${postId}&userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('いいね情報の取得に失敗しました');
    }
    
    return await response.json();
  } catch (error) {
    console.error('いいね情報取得エラー:', error);
    return { count: 0, isLiked: false };
  }
};

export const toggleLike = async (postId: string): Promise<{ count: number; isLiked: boolean }> => {
  try {
    const userId = getUserId();
    
    if (!userId || !postId) {
      return { count: 0, isLiked: false };
    }
    
    // 現在のいいね状態を取得
    const currentStatus = await fetchLikeStatus(postId);
    
    // いいねの追加または削除
    const action = currentStatus.isLiked ? 'unlike' : 'like';
    
    const response = await fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        userId,
        action,
      }),
    });
    
    if (!response.ok) {
      throw new Error('いいね処理に失敗しました');
    }
    
    return await response.json();
  } catch (error) {
    console.error('いいね処理エラー:', error);
    throw error;
  }
}; 