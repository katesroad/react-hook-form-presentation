import {
  Button,
  ButtonGroup,
  FormField,
  FormFieldGroup,
} from '@react-hook-form/shared-components';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: 'cart',
    control,
  });

  const total = formValues.reduce(
    (acc, current) => acc + (current.price ?? 0) * (current.quantity || 0),
    0
  );

  return <p>Total Amount: {total}</p>;
};

export default function Demo() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: 'test', quantity: 1, price: 23 }],
    },
    mode: 'onBlur',
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
                    required: true,
                  })}
                  className={errors?.cart?.[index]?.name ? 'error' : ''}
                />
              </FormField>
              <FormField label="Number" inline>
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
              <FormField label="Price" inline>
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
              <ButtonGroup className="button-group">
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
