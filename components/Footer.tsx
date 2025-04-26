
export default function Footer() {
    return (
        <div className="flex justify-between items-center border-t-1 border-gray-300 py-10 px-20">
            <div>
                <h2 className="font-['krok'] text-center"><span className="font-['anonymous-pro'] font-bold">@2025</span> KanikanLab</h2>
            </div>
            <div className="flex justify-center items-center">
                <a href="/privacy-policy">プライバシーポリシー</a>
                <span className="inline-block w-0.5 h-4 bg-gray-300 mx-5"></span>
                <a href="/disclaimer">免責事項</a>
            </div>
        </div>
    )
}