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

// ===== GT3 PART 2 -- THE TYPES THE API ACTUALLY RETURNS =====
// JSON has no Date, and json-server writes ids as strings. So what the
// API hands back is NOT the exact Product / PreOrder shape declared above.

// Product never had an id field at all -- the API adds one, so this is
// an intersection (&), not an Omit.
export type ApiProduct = Product & { id: string };

// PreOrder already declares id: number and orderedAt: Date -- both need
// replacing, so this uses Omit the same way Session 1's Submission would.
export type ApiPreOrder = Omit<PreOrder, "id" | "orderedAt"> & {
  id: string;
  orderedAt: string;
};

// What we SEND when creating a pre-order. No id yet -- the server makes one.
export type NewPreOrder = Omit<ApiPreOrder, "id">;