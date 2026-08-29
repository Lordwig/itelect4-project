// src/pages/OrdersPage.tsx -- the finished file
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiPreOrder } from "../types/index";
import { preOrderSchema } from "../schemas/preOrderSchema";
import type { PreOrderFormValues } from "../schemas/preOrderSchema";
import OrderBadge from "../components/OrderBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPreOrders, createPreOrder } from "../api/client";
// The useState import is GONE -- useForm holds the values now

function OrdersPage() {
  const queryClient = useQueryClient();

  // useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PreOrderFormValues>({
    resolver: zodResolver(preOrderSchema),
    mode: "onBlur",
    defaultValues: { productName: "", quantity: 1, pickupTime: "" },
  });

  const { data, isPending, isError } = useQuery<ApiPreOrder[]>({
    queryKey: ["preorders"],
    queryFn: fetchPreOrders,
  });

  const addPreOrder = useMutation({
    mutationFn: createPreOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preorders"] });
      reset(); // clears every field at once
    },
  });

  // handleSubmit only calls this after the schema passes.
  const onSubmit = (values: PreOrderFormValues): void => {
    addPreOrder.mutate({
      customerId: 1,
      productName: values.productName,
      quantity: values.quantity,
      pickupTime: values.pickupTime,
      status: "Pending",
      orderedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading orders...</div>;
  }
  if (isError) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">Could not load orders.</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">My Orders</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-border p-4"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="productName">Product</Label>
          <Input
            id="productName"
            {...register("productName")}
            aria-invalid={errors.productName ? true : undefined}
            placeholder="e.g. Iced Coffee"
          />
          {errors.productName && (
            <p className="text-sm text-red-600">{errors.productName.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            aria-invalid={errors.quantity ? true : undefined}
            placeholder="1"
          />
          {errors.quantity && (
            <p className="text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="pickupTime">Pickup time</Label>
          <Input
            id="pickupTime"
            type="datetime-local"
            {...register("pickupTime")}
            aria-invalid={errors.pickupTime ? true : undefined}
          />
          {errors.pickupTime && (
            <p className="text-sm text-red-600">{errors.pickupTime.message}</p>
          )}
        </div>

        {/* Never disabled on "invalid": clicking it is what shows the
            error messages. Only a save in flight disables it. */}
        <Button type="submit" disabled={addPreOrder.isPending} className="justify-self-start">
          {addPreOrder.isPending ? "Saving..." : "Add pre-order"}
        </Button>

        {addPreOrder.isError && (
          <p className="text-sm text-red-700">{addPreOrder.error.message}</p>
        )}
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((o) => (
          <OrderBadge key={o.id} order={o}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order #{o.id}</p>
          </OrderBadge>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;