import {
  Button,
  ButtonGroup,
  FormField,
  FormFieldGroup,
} from '@react-hook-form/shared-components';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, useFieldArray } from 'react-hook-form';

import Total, { FormValues } from './Total';

export default function Demo() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: 'Apple', quantity: 1, price: 23 }],
    },
    mode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((field, index) => {
          return (
            <FormFieldGroup key={field.id} inline>
              <FormField label="Name" inline>
                <input
                  placeholder="name"
                  {...register(`cart.${index}.name` as const, {
                    required: 'Product name is required',
                  })}
                  className={errors?.cart?.[index]?.name ? 'error' : ''}
                />
                <ErrorMessage
                  errors={errors}
                  name={`cart.${index}.name` as const}
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </FormField>
              <FormField label="Number" inline>
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`cart.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: 'Product amount is required',
                    max: {
                      value: 10,
                      message: 'You can record 10 item a time at most',
                    },
                    min: {
                      value: 1,
                      message: 'At least one item is required',
                    },
                  })}
                  className={errors?.cart?.[index]?.quantity ? 'error' : ''}
                />
                <ErrorMessage
                  errors={errors}
                  name={`cart.${index}.quantity` as const}
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </FormField>
              <FormField label="Price" inline>
                <input
                  placeholder="value"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                    required: 'product price is required',
                    min: {
                      message: "Price can't less than 0.1 dollar",
                      value: 0.1,
                    },
                    max: {
                      message: "Price can't large than 100 dollar",
                      value: 100,
                    },
                  })}
                  className={errors?.cart?.[index]?.price ? 'error' : ''}
                />
                <ErrorMessage
                  errors={errors}
                  name={`cart.${index}.price` as const}
                  render={({ message }) => <p className="error">{message}</p>}
                />
              </FormField>
              <ButtonGroup>
                {fields.length !== 1 && (
                  <Button onClick={() => remove(index)}>-</Button>
                )}
                {index + 1 === fields.length && (
                  <Button
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
      </ul>
      <Total control={control} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
