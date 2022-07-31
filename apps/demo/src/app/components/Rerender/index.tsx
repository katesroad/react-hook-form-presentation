import {
  Button,
  ButtonGroup,
  FormField,
  FormFieldGroup,
} from '@react-hook-form/shared-components';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: 'cart',
    control,
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

function UserCart(props: { title: string; cart: CartItem[] }) {
  const { title, cart } = props;

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { cart },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  useEffect(() => {
    reset({ cart });
  }, [cart, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {title && <h3>{title}</h3>}
      {fields.map((field, index) => {
        return (
          <FormFieldGroup key={field.id}>
            <FormField label="Name" key={field.id}>
              <input
                placeholder="name"
                {...register(`cart.${index}.name` as const, {
                  required: true,
                })}
                className={errors?.cart?.[index]?.name ? 'error' : ''}
              />
            </FormField>
            <FormField label="Number">
              <input
                placeholder="quantity"
                type="number"
                {...register(`cart.${index}.quantity` as const, {
                  valueAsNumber: true,
                  required: true,
                })}
                className={errors?.cart?.[index]?.quantity ? 'error' : ''}
              />
            </FormField>
            <FormField label="Quantity">
              <input
                placeholder="value"
                type="number"
                {...register(`cart.${index}.price` as const, {
                  valueAsNumber: true,
                  required: true,
                })}
                className={errors?.cart?.[index]?.price ? 'error' : ''}
              />
            </FormField>
            <ButtonGroup>
              <Button type="button" onClick={() => remove(index)}>
                -
              </Button>
              {index + 1 === fields.length && (
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      name: '',
                      quantity: 0,
                      price: 0,
                    })
                  }
                >
                  +
                </Button>
              )}
            </ButtonGroup>
          </FormFieldGroup>
        );
      })}
      {cart && (
        <React.Fragment>
          <Total control={control} />
          <Button type="submit">Submit</Button>
        </React.Fragment>
      )}
    </form>
  );
}

export default function Demo() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setCart([
        {
          name: 'Apple',
          quantity: 12,
          price: 12,
        },
      ]);
    }, 2500);
  }, []);

  return (
    <React.Fragment>
      <p>
        <strong>parent data</strong>:{JSON.stringify(cart)}
      </p>
      <UserCart cart={cart} title="Checkout" />
    </React.Fragment>
  );
}
