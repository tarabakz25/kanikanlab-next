"use client";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { redirect } from "next/navigation";
export default function LikeAndShare() {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="mt-15 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleLike}
          className="rounded-full bg-gray-900 p-2.5 text-2xl"
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
        onClick={() => {
          redirect(`https://twitter.com/share?url=${window.location.href}`);
        }}
        className="rounded-full bg-gray-900 p-2.5 text-2xl"
      >
        <FaShareFromSquare className="transform transition-all hover:scale-110 hover:text-blue-500" />
      </button>
    </div>
  );
}
