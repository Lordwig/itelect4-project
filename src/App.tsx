// src/App.tsx
import { useState, useEffect, useRef } from "react";
import type { Customer, Product, PreOrder } from "./types/index";
import CustomerCard from "./components/CustomerCard";
import ProductCard from "./components/ProductCard";
import OrderBadge from "./components/OrderBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import "./App.css";

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
  // ===== TYPED STATE WITH useState<T> =====
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== TYPED DOM REFERENCE WITH useRef =====
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // ===== LOADING MOCK DATA WITH useEffect =====
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

  // Derived value -- recomputed every render, not stored in state
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p className="loading-text">Loading products...</p>;
  }

  return (
    <>
      <header className="app-header">
        <h1>Pre-Order Platform</h1>
        <p>ITELECT4 -- GT2 Part 2 -- React Hooks + State</p>
      </header>

      <div className="app">
        <input
          ref={searchInputRef}
          value={searchTerm}
          type="text"
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="search-input"
        />

        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="previous-search">Previous search: "{previousSearch}"</p>
        )}

        <CustomerCard customer={customer} onSelect={setSelectedCustomer} />
        {selectedCustomer && <p>Selected: {selectedCustomer.name}</p>}

        <button onClick={toggleDetails} className="toggle-btn">
          {showDetails ? "Hide" : "Show"} Details
        </button>

        {filteredProducts.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}

        {showDetails && (
          <OrderBadge order={preOrder}>
            <p>Ready for pickup!</p>
          </OrderBadge>
        )}
      </div>
    </>
  );
}

export default App;