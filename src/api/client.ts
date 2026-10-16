// src/api/client.ts -- every request to the backend lives in this one file
import type {
  ApiProduct,
  ApiPreOrder,
  NewPreOrder,
  ApiCustomer,
  AuthReply,
} from "../types/index";
import type { LoginFormValues, RegisterFormValues } from "../schemas/authSchema";
import useAuthStore from "../store/authStore";

// Vite reads VITE_API_URL out of .env at build time and pastes the value in.
// This is the ONLY place the backend's address appears in the whole app.
export const API_URL = import.meta.env.VITE_API_URL;

// Every call goes through here, so the token is attached in one place.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // getState() reads the store from outside a component. A hook cannot be
  // called here, because this is a plain function, not a component.
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // fetch does not throw on a 400 or 401 -- only when nothing came back at
  // all. So check res.ok, and surface the backend's own message, because it
  // already wrote a good one ("Email or password is incorrect").
  if (!res.ok) {
    const body: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  // 204 means "done, and there is deliberately no body" -- nothing to parse.
  if (res.status === 204) return undefined as T;

  return res.json();
}

// ----- products: public, no token needed -----
export function fetchProducts(): Promise<ApiProduct[]> {
  return request<ApiProduct[]>("/api/products");
}

// A real route for one row. GT3 asked json-server for ?name= and unwrapped
// matches[0]; the backend has GET /api/products/:name, so that is gone.
export function fetchProductByName(name: string): Promise<ApiProduct> {
  return request<ApiProduct>(`/api/products/${encodeURIComponent(name)}`);
}

// ----- pre-orders: private, the token decides whose -----
export function fetchPreOrders(): Promise<ApiPreOrder[]> {
  return request<ApiPreOrder[]>("/api/preorders");
}

export function createPreOrder(newPreOrder: NewPreOrder): Promise<ApiPreOrder> {
  return request<ApiPreOrder>("/api/preorders", {
    method: "POST",
    body: JSON.stringify(newPreOrder),
  });
}

// ----- auth -----
export function registerCustomer(body: RegisterFormValues): Promise<ApiCustomer> {
  return request<ApiCustomer>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginCustomer(body: LoginFormValues): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}