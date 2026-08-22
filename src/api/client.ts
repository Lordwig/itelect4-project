// src/api/client.ts -- every call to json-server lives in this one file
import type { ApiProduct, ApiPreOrder, NewPreOrder } from "../types/index";

export const API_URL = "http://localhost:3001";

// GET /products -> the whole list
export async function fetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error("Could not load products");
  }
  return res.json();
}

// GET /products?name=Croissant -> an ARRAY of matches, not one product
export async function fetchProductByName(name: string): Promise<ApiProduct> {
  const res = await fetch(
    `${API_URL}/products?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) {
    throw new Error("Could not load that product");
  }
  const matches: ApiProduct[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No product found with name "${name}".`);
  }
  return matches[0];
}

// GET /preorders
export async function fetchPreOrders(): Promise<ApiPreOrder[]> {
  const res = await fetch(`${API_URL}/preorders`);
  if (!res.ok) {
    throw new Error("Could not load pre-orders");
  }
  return res.json();
}

// POST /preorders -> the row the server saved, with the id it made
export async function createPreOrder(
  newPreOrder: NewPreOrder
): Promise<ApiPreOrder> {
  const res = await fetch(`${API_URL}/preorders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPreOrder),
  });
  if (!res.ok) {
    throw new Error("Could not save the pre-order");
  }
  return res.json();
}