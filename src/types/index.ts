// ===== INTERFACES =====
export interface Customer {
id: number;
name: string;
email: string;
role: "customer" | "staff" | "admin";
isActive: boolean;
points: number;
}
export interface Product {
name: string;
price: number;
category: string;
}
export interface PreOrder {
id: number;
customerId: number;
productName: string;
quantity: number;
pickupTime: string;
status: string;
orderedAt: Date;
}

// ===== TYPE ALIASES =====
export type ID = number | string;
export type Coordinate = {
x: number;
y: number;
};
export type Formatter = (value: number) => string;
const customerId: ID = "C2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatPrice: Formatter = (value) => `PHP ${value.toFixed(2)}`;
console.log(customerId);
console.log(position);
console.log(formatPrice(120));

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";
function printId(id: StringOrNumber): void {
console.log(`ID: ${id}`);
}
export { printId };
printId(101);
printId("C2026-001");
// ===== INTERSECTION TYPES -- combines ALL properties =====
export type CustomerWithOrder = Customer & {
latestOrder: PreOrder;
totalSpent: number;
};
const topCustomer: CustomerWithOrder = {
id: 1, name: "Maria Santos", email: "m@example.com",
role: "customer", isActive: true, points: 120,
latestOrder: {
  id: 1,
  customerId: 1,
  productName: "Iced Coffee",
  quantity: 1,
  pickupTime: "2026-08-22T15:00",
  status: "Preparing",
  orderedAt: new Date(),
},
totalSpent: 540,
};
console.log(topCustomer);

function processInput(input: StringOrNumber): string {
if (typeof input === "string") {
return input.toUpperCase();
}
return input.toFixed(2);
}
function formatDate(value: string | Date): string {
if (value instanceof Date) {
return value.toLocaleDateString();
}
return value;
}
console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type CustomerUpdate = Partial<Customer>;
export type CustomerPreview = Pick<Customer, "id" | "name" | "role">;
export type PublicCustomer = Omit<Customer, "email" | "isActive">;
export type RoleCount = Record<"customer" | "staff" | "admin", number>;

// ===== ENUMS =====
export enum OrderStatus {
  Pending,
  Preparing,
  Ready,
  Completed,
}
export const enum Role {
  Customer = "customer",
  Staff = "staff",
  Admin = "admin",
}

// ===== GT4 PART 2 -- THE TYPES THE BACKEND ACTUALLY RETURNS =====
// MongoDB writes ids as 24-character strings and JSON turns every Date
// into a string, so what the backend sends is NOT the Product / PreOrder /
// Customer shape declared above. Each type below is DERIVED from its
// interface, so the interface stays the single source of truth.

// Product never had an id field -- the backend adds one, so this is an
// intersection (&), not an Omit. Unchanged since GT3.
export type ApiProduct = Product & { id: string };

// Three fields change type: id and customerId become strings, and
// orderedAt becomes the string JSON turned the Date into.
export type ApiPreOrder = Omit<PreOrder, "id" | "customerId" | "orderedAt"> & {
  id: string;
  customerId: string;
  orderedAt: string;
};

// What we SEND to create one. Only the three fields the person typed:
// the server adds the id, the status, the date -- and the owner, which it
// reads off the token instead of trusting the request.
export type NewPreOrder = Pick<
  PreOrder,
  "productName" | "quantity" | "pickupTime"
>;

// A customer as the backend sends one back: no password, and a string id.
export type ApiCustomer = Omit<Customer, "id"> & { id: string };

// What POST /api/auth/login answers with.
export interface AuthReply {
  token: string;
  customer: ApiCustomer;
}

// ===== GT5: what POST /api/ai answers with =====
// Hand-written, and a COPY of the backend's Suggestion type: the schema
// that generates it lives in itelect4-backend, in another repository, so
// there is nothing here to infer it from. If the backend's schema
// changes, this changes by hand.
export interface AiSuggestion {
  summary: string;
  picks: string[];
  match: "good" | "partial" | "none";
}