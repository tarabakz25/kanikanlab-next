import Image from "next/image";
import { getProduct } from "@/lib/notionGetProducts";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image src={product.heroImage.url} alt={product.name} width={100} height={100} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        
      </div>
    </div>
  );
}