// src/pages/ProductDetailPage.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { ApiProduct } from "../types/index";
import ProductCard from "../components/ProductCard";
import { fetchProductByName } from "../api/client";
// The mockData import is GONE -- allProducts no longer exists

function ProductDetailPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  // The name from the URL goes INTO the key, so /products/Croissant and
  // /products/Iced%20Coffee get one cache entry each instead of sharing one.
  const decodedName = name !== undefined ? decodeURIComponent(name) : "";
  const { data, isPending, isError, error } = useQuery<ApiProduct>({
    queryKey: ["products", decodedName],
    queryFn: () => fetchProductByName(decodedName),
    enabled: name !== undefined, // do not run without a name
  });

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading product...
      </div>
    );
  }

  // A bad name makes fetchProductByName throw, and the throw lands here
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.name}
      </h2>
      <div className="max-w-sm">
        <ProductCard product={data} />
      </div>
      <button
        onClick={() => navigate("/products")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Products
      </button>
    </div>
  );
}

export default ProductDetailPage;