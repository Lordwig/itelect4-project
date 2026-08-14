// src/components/ProductCard.tsx
import type { Product } from "../types/index";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3
        className={`font-bold text-gray-900 dark:text-white ${
          isCompact ? "text-sm" : "text-lg"
        }`}
      >
        {product.name}
      </h3>
      {!isCompact && (
        <p className="text-gray-600 dark:text-gray-300">{product.category}</p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        PHP {product.price}
      </p>
    </div>
  );
}

export default ProductCard;