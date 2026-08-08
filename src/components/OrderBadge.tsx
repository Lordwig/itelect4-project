// src/components/OrderBadge.tsx
import type { PreOrder } from "../types/index";

interface OrderBadgeProps {
  order: PreOrder;
  children?: React.ReactNode;
}

const OrderBadge: React.FC<OrderBadgeProps> = ({ order, children }) => {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-5
      shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p className="text-gray-600 dark:text-gray-300">
        Product: {order.productName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {order.status ?? "Not started yet"}
      </p>
      <div className="mt-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
        {children}
      </div>
    </div>
  );
};

export default OrderBadge;