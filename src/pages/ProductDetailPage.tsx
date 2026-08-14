// src/pages/ProductDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import ProductCard from "../components/ProductCard";
import { allProducts } from "../data/mockData";

function ProductDetailPage() {
  // Reads whatever is in the :name slot of the URL
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  // The URL segment is encoded (spaces become %20 etc), so decode before matching
  const decodedName = name !== undefined ? decodeURIComponent(name) : "";
  const product = allProducts.find((p) => p.name === decodedName);

  // The URL is user input -- they can type anything. Handle that.
  if (product === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No product found with name "{decodedName}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {product.name}
      </h2>
      <div className="max-w-sm">
        <ProductCard product={product} />
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