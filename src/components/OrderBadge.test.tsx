import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderBadge from "./OrderBadge";
import type { ApiPreOrder } from "../types/index";

// Typed sample data: the same shape the backend sends, so a field renamed
// in types/index.ts breaks this file at compile time, not in front of a user.
const preparing: ApiPreOrder = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  customerId: "665f1c2ab4e8d3a1f0c9e001",
  productName: "Iced Coffee",
  quantity: 2,
  pickupTime: "2026-10-30T15:00",
  status: "Preparing",
  orderedAt: "2026-10-29T02:15:00.000Z",
};

describe("OrderBadge", () => {
  it("shows the product, the quantity and the status", () => {
    render(<OrderBadge order={preparing} />);

    expect(screen.getByText("Product: Iced Coffee x2")).toBeInTheDocument();
    expect(screen.getByText("Status: Preparing")).toBeInTheDocument();
  });

  it("shows the status it is given, not a fixed one", () => {
    const ready: ApiPreOrder = { ...preparing, status: "Ready" };
    render(<OrderBadge order={ready} />);

    expect(screen.getByText("Status: Ready")).toBeInTheDocument();
    expect(screen.queryByText("Status: Preparing")).not.toBeInTheDocument();
  });
});