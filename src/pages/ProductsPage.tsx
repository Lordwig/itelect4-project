// src/pages/ProductsPage.tsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import type { ApiProduct } from "../types/index";
import ProductCard from "../components/ProductCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchProducts } from "../api/client";
// useState, useEffect, useRef and mockData imports are GONE

function ProductsPage() {
  // These four lines replace all of GT2's fetching state
  const { data, isPending, isError, error } = useQuery<ApiProduct[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // The search box now reads and writes the store, not local state
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  // Below this line data is ApiProduct[], never undefined
  const filteredProducts = data.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Products
      </h2>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-sm rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <Link key={p.id} to={`/products/${encodeURIComponent(p.name)}`}>
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;