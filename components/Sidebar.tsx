import Image from 'next/image'

export default function Sidebar() {
    return (
        <div className="w-full mb-2">
            <div className="bg-white rounded-2xl p-1">
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
                <p>Kizuki</p>
                <p>
                    神山まるごと高専一期生。 東京→徳島
                    旅行、生成AI、テクノロジーを追って日々精進中。
                    主にプログラミング、生成AIに関する情報を発信中。時々趣味の話が上がるかも？
                </p>
                <p>\ Follow me! /</p>
                <div>
                    <a href="https://x.com/kz25_kmc"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://github.com/tarabakz25"><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
            <div>
                <h3>カテゴリー</h3>
                <ul>
                    
                </ul>
            </div>
        </div>
    )
}