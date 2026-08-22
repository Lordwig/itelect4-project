// src/components/OrderBadge.tsx
import type { ApiPreOrder } from "../types/index"; // was PreOrder

interface OrderBadgeProps {
  order: ApiPreOrder; // was PreOrder
  children?: React.ReactNode;
}

const OrderBadge: React.FC<OrderBadgeProps> = ({ order, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p className="text-gray-900 dark:text-white">
        Product: {order.productName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {order.status ?? "Not started yet"}
      </p>
      {children}
    </div>
  );
};

export default OrderBadge;