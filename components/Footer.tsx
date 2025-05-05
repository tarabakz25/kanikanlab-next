export default function Footer() {
  return (
    <div className="flex items-center justify-between border-t dark:bg-gray-900 border-gray-300 px-20 py-10">
      <div>
        <h2 className="text-center font-['krok']">
          <span className="font-['anonymous-pro'] font-bold">@2025</span>{" "}
          KanikanLab
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <a href="/privacy-policy">プライバシーポリシー</a>
        <span className="mx-5 inline-block h-4 w-0.5 bg-gray-300"></span>
        <a href="/disclaimer">免責事項</a>
      </div>
    </div>
  );
}
