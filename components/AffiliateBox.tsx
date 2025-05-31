import Image from "next/image";
import Link from "next/link";
import { AffiliateProduct } from "@/types";
import { FaExternalLinkAlt, FaShoppingCart } from "react-icons/fa";

type Props = {
  products: AffiliateProduct[];
};

export default function AffiliateBox({ products }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 shadow-md dark:bg-gray-900">
      <h3 className="flex items-center gap-2 font-[krok] text-xl tracking-wider">
        <FaShoppingCart className="text-blue-600" />
        おすすめ商品
      </h3>
      <div className="flex flex-col gap-3">
        {products.slice(0, 3).map((product) => (
          <Link
            key={product.id}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:hover:border-blue-600"
          >
            <div className="flex gap-3">
              {product.image && (
                <div className="flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                  {product.title}
                </h4>
                {product.description && (
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.price && (
                  <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                    {product.price}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <span>詳細を見る</span>
                  <FaExternalLinkAlt className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
