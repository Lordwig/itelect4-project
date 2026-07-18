// src/components/ProductCard.tsx
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>
        PHP {product.price} -- {product.category}
      </p>
    </div>
  );
}

export default ProductCard;