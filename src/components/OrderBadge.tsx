// src/components/OrderBadge.tsx
import type { PreOrder } from "../types/index";

interface OrderBadgeProps {
  order: PreOrder;
  children?: React.ReactNode;
}

const OrderBadge: React.FC<OrderBadgeProps> = ({ order, children }) => {
  return (
    <div className="order-badge">
      <p>Product: {order.productName}</p>
      <p>Status: {order.status ?? "Not started yet"}</p>
      {children}
    </div>
  );
};

export default OrderBadge;