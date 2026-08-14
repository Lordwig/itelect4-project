// src/pages/OrdersPage.tsx
import OrderBadge from "../components/OrderBadge";
import { allPreOrders } from "../data/mockData";

function OrdersPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Orders
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allPreOrders.map((o) => (
          <OrderBadge key={o.id} order={o}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Order #{o.id}
            </p>
          </OrderBadge>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;