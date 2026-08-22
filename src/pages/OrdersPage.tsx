// src/pages/OrdersPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiPreOrder } from "../types/index";
import OrderBadge from "../components/OrderBadge";
import { fetchPreOrders, createPreOrder } from "../api/client";
// The mockData import is GONE -- allPreOrders no longer exists

function OrdersPage() {
  // Local, because only this one form reads it. Not store material.
  const [productName, setProductName] = useState<string>("");
  const queryClient = useQueryClient();

  // 1. READ -- same useQuery pattern as ProductsPage
  const { data, isPending, isError } = useQuery<ApiPreOrder[]>({
    queryKey: ["preorders"],
    queryFn: fetchPreOrders,
  });

  // 2. WRITE -- mutationFn does the POST, onSuccess cleans up after it
  const addPreOrder = useMutation({
    mutationFn: createPreOrder,
    onSuccess: () => {
      // "the pre-orders list is out of date now -- go and refetch it"
      queryClient.invalidateQueries({ queryKey: ["preorders"] });
      setProductName("");
    },
  });

  // mutate() is what an event handler calls. It does not return the
  // result -- you read that off addPreOrder afterwards.
  const handleAdd = (): void => {
    addPreOrder.mutate({
      customerId: 1,
      productName: productName,
      status: "Pending",
      orderedAt: new Date().toISOString(), // a STRING, not a Date
    });
  };

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load orders.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Orders
      </h2>

      <div className="mb-6 flex gap-2">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name, e.g. Matcha Latte"
          className="w-full max-w-sm rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleAdd}
          disabled={productName === "" || addPreOrder.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addPreOrder.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addPreOrder.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addPreOrder.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((o) => (
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