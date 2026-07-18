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
    <div className="customer-card">
      <h3>{customer.name}</h3>
      <p>{customer.email}</p>
      <p>Role: {customer.role}</p>
      <button onClick={handleClick}>Select</button>
      <input onChange={handleChange} placeholder="Search..." />
    </div>
  );
}

export default CustomerCard;