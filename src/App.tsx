// src/App.tsx
import { useState, useEffect, useRef } from "react";
import type { Customer, Product, PreOrder } from "./types/index";
import CustomerCard from "./components/CustomerCard";
import ProductCard from "./components/ProductCard";
import OrderBadge from "./components/OrderBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const customer: Customer = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "customer",
  isActive: true,
  points: 95.5,
};

const product: Product = {
  name: "Iced Coffee",
  price: 120,
  category: "Beverage",
};

const preOrder: PreOrder = {
  id: 1,
  customerId: 1,
  productName: "Iced Coffee",
  status: "Preparing",
  orderedAt: new Date(),
};

function App() {
  // ===== TYPED STATE =====
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== TYPED DOM REFERENCE =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== LOADING MOCK DATA =====
  useEffect(() => {
    setTimeout(() => {
      setProducts([product]);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== TYPED DOM EVENT =====
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== STYLED LOADING STATE =====
  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading products...
      </div>
    );
  }

  // ===== STYLED ERROR STATE =====
  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load products. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pre-Order Platform
          </h1>
          <div>
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white
                dark:bg-gray-200 dark:text-gray-900"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => setIsError(true)}
              className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700"
            >
              Simulate Error
            </button>
          </div>
        </div>

        <input
          ref={searchInputRef}
          value={searchTerm}
          type="text"
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="mt-4 w-full max-w-sm rounded border border-gray-300 p-2
            dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}

        <button
          onClick={toggleDetails}
          className="mt-3 rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-800
            dark:bg-gray-700 dark:text-white"
        >
          {showDetails ? "Hide" : "Show"} Details
        </button>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CustomerCard customer={customer} onSelect={setSelectedCustomer} />

          {filteredProducts.map((p) => (
            <ProductCard key={p.name} product={p} variant="compact" />
          ))}

          {showDetails && (
            <OrderBadge order={preOrder}>
              <p>Ready for pickup!</p>
            </OrderBadge>
          )}
        </div>

        {selectedCustomer && (
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Selected: {selectedCustomer.name}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;