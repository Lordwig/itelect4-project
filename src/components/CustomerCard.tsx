// src/components/CustomerCard.tsx
import type { Customer } from "../types/index";

interface CustomerCardProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}

function CustomerCard({ customer, onSelect }: CustomerCardProps) {
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(customer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {customer.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{customer.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Role: {customer.role}
      </p>
      <button
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Select
      </button>
      <input
        onChange={handleChange}
        placeholder="Quick note (demo only)"
        className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}

export default CustomerCard;