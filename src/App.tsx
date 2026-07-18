// src/App.tsx
import CustomerCard from "./components/CustomerCard";
import ProductCard from "./components/ProductCard";
import OrderBadge from "./components/OrderBadge";
import type { Customer, Product, PreOrder } from "./types/index";
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
  return (
    <>
      <header className="app-header">
        <h1>Pre-Order Platform</h1>
        <p>ITELECT4 — GT2 Part 1 · React + TypeScript Components</p>
      </header>
      <div className="app">
        <CustomerCard customer={customer} onSelect={(c) => console.log(c)} />
        <ProductCard product={product} />
        <OrderBadge order={preOrder}>
          <p>Ready for pickup!</p>
        </OrderBadge>
      </div>
    </>
  );
}

export default App;