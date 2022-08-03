import React from 'react';
import { useWatch, Control } from 'react-hook-form';

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: 'cart', // The field name we want to monitor; Vue.jsx computed functionality
    control,
  });

  const total = formValues.reduce(
    (acc, current) => acc + (current.price ?? 0) * (current.quantity || 0),
    0
  );

  return <p>Total Amount: {total}</p>;
};

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default Total;

export type { FormValues };
