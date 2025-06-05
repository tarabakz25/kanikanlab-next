"use client";
import { Product as NotionProduct } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductsContainerProps {
  products?: NotionProduct[];
}

export default function ProductsContainer({ products: initialProducts }: ProductsContainerProps) {
  const [products, setProducts] = useState<NotionProduct[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (!initialProducts) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch(error => {
          console.error('プロダクト取得エラー:', error);
          setLoading(false);
        });
    }
  }, [initialProducts]);
  if (loading) {
    return <div className="text-center">読み込み中...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
          {product.heroImage.url && (
            <div className="mb-4">
              <Image
                src={product.heroImage.url}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {product.publishedAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
