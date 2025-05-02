'use client'
import { useState } from "react"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { FaShareFromSquare } from "react-icons/fa6"
import { redirect } from "next/navigation"
export default function LikeAndShare() {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    }
    
    return (
        <div className="flex flex-col items-center gap-4 mt-15">
            <div className="flex flex-col items-center gap-1">
                <button onClick={handleLike} className="text-2xl rounded-full p-2.5 bg-gray-100">
                    {isLiked ? <FaHeart className="transition-all text-red-500 transform hover:scale-110" /> : <FaRegHeart className="transition-all transform hover:scale-110" />}
                </button>
                <span className="text-sm font-bold">{likesCount}</span>
            </div>
            <button onClick={() => {redirect(`https://twitter.com/share?url=${window.location.href}`)}} className="text-2xl rounded-full p-2.5 bg-gray-100">
                <FaShareFromSquare className="transition-all transform hover:scale-110 hover:text-blue-500" />
            </button>
        </div>
    )
}