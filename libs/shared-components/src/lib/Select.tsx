import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { FormField } from './FormField';

export type Props = {
  options: { label: string; value: string }[];
  name: string;
  disabled?: boolean;
  label: string;
  validation?: { required: boolean | string };
};

function Select({
  name,
  options,
  disabled,
  validation = { required: false },
  label,
}: Props) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const value = getValues(name);

  return (
    <FormField label={label}>
      <select
        {...register(name, {
          disabled,
          ...validation,
        })}
        defaultValue={value}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="error">
            {message ?? `${label.toLowerCase()} is required`}
          </p>
        )}
      />
    </FormField>
  );
}

export { Select };
