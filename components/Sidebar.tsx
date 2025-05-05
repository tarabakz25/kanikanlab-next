import Image from "next/image";
import { FaTwitter, FaGithub, FaTag } from "react-icons/fa";

import { Blog } from "@/types";
import { HoverTextHeader } from "./Animation";

type Props = {
  blogs: Blog[];
};

export default function Sidebar({ blogs }: Props) {
  // カテゴリーの重複を排除する
  const uniqueCategories = Array.from(
    new Set(
      blogs.flatMap((blog) =>
        Array.isArray(blog.categories) ? blog.categories : [blog.categories]
      )
    )
  );

  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex w-72 flex-col items-center gap-2 rounded-2xl p-4 shadow-md dark:bg-gray-900">
        <Image
          src="/about.png"
          alt="logo"
          width={500}
          height={500}
          className="h-auto w-20 rounded-full"
        />
        <p className="font-[anonymous-pro] text-2xl font-bold">Kizuki</p>
        <p>
          神山まるごと高専一期生。 東京→徳島
          旅行、生成AI、テクノロジーを追って日々精進中。
          主にプログラミング、生成AIに関する情報を発信中。時々趣味の話が上がるかも？
        </p>
        <p className="mt-3 font-[krok] tracking-wider">\ Follow me! /</p>
        <div className="mb-3 flex flex-row gap-5">
          <a
            href="https://x.com/kz25_kmc"
            className="text-2xl transition-all hover:text-blue-600"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/tarabakz25"
            className="text-2xl transition-all hover:text-blue-600"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-2xl p-2 pt-5 pb-5 shadow-lg dark:bg-gray-900">
        <h3 className="mt-5 mb-10 font-[krok] text-2xl tracking-wider">
          Category
        </h3>
        <ul className="flex h-full list-none flex-col gap-5 text-left">
          {uniqueCategories.map((category, index) => (
            <li key={`category-${index}`}>
              <HoverTextHeader>
                <a
                  href={`/blog/categories/${category}`}
                  className="decoration-none relative block pl-3"
                >
                  <FaTag className="absolute top-1.5 left-[-0.5rem]" />
                  {category}
                </a>
              </HoverTextHeader>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
