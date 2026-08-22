// src/data/mockData.ts
// allProducts and allPreOrders are DELETED. They live in db.json now,
// and the app fetches them instead of importing them.
//
// `customer` stays. There is no /customers endpoint and no real login
// until a later module -- the Dashboard's customer is still hard-coded,
// on purpose.
import type { Customer } from "../types/index";

export const customer: Customer = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "customer",
  isActive: true,
  points: 95.5,
};