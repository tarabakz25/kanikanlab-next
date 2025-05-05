"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { fetchLikeStatus, toggleLike } from "@/utils/likes";

type LikeAndShareProps = {
  postId: string;
};

export default function LikeAndShare({ postId }: LikeAndShareProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネント読み込み時にいいね状態を取得
  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const { count, isLiked } = await fetchLikeStatus(postId);
        setLikesCount(count);
        setIsLiked(isLiked);
      } catch (error) {
        console.error("いいね状態の取得に失敗しました:", error);
      }
    };

    getLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // 楽観的UI更新 - 即座にUIを更新
    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    
    setIsLiked(newIsLiked);
    setLikesCount(newCount);
    
    try {
      // バックグラウンドでAPIを呼び出し
      const { count, isLiked } = await toggleLike(postId);
      
      // APIレスポンスと異なる場合のみ更新
      if (count !== newCount || isLiked !== newIsLiked) {
        setLikesCount(count);
        setIsLiked(isLiked);
      }
    } catch (error) {
      console.error("いいね処理に失敗しました:", error);
      // エラー時は元の状態に戻す
      setIsLiked(!newIsLiked);
      setLikesCount(newIsLiked ? newCount - 1 : newCount + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      window.open(`https://twitter.com/share?url=${window.location.href}`, "_blank");
    }
  };

  return (
    <div className="mt-15 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleLike}
          className="rounded-full bg-gray-900 p-2.5 text-2xl"
          disabled={isLoading}
        >
          {isLiked ? (
            <FaHeart className="transform text-red-500 transition-all hover:scale-110" />
          ) : (
            <FaRegHeart className="transform transition-all hover:scale-110" />
          )}
        </button>
        <span className="text-sm font-bold">{likesCount}</span>
      </div>
      <button
        onClick={handleShare}
        className="rounded-full bg-gray-900 p-2.5 text-2xl"
      >
        <FaShareFromSquare className="transform transition-all hover:scale-110 hover:text-blue-500" />
      </button>
    </div>
  );
}
