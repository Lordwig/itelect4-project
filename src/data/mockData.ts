// src/data/mockData.ts -- shared across pages, so more than one route can use it
import type { Customer, Product, PreOrder } from "../types/index";

export const customer: Customer = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "customer",
  isActive: true,
  points: 95.5,
};

export const allProducts: Product[] = [
  { name: "Iced Coffee", price: 120, category: "Beverage" },
  { name: "Croissant", price: 95, category: "Pastry" },
  { name: "Matcha Latte", price: 150, category: "Beverage" },
  { name: "Ham & Cheese Sandwich", price: 135, category: "Food" },
];

export const allPreOrders: PreOrder[] = [
  {
    id: 1,
    customerId: 1,
    productName: "Iced Coffee",
    status: "Preparing",
    orderedAt: new Date(),
  },
  {
    id: 2,
    customerId: 1,
    productName: "Croissant",
    status: "Ready",
    orderedAt: new Date(),
  },
];