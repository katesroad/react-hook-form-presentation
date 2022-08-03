import {
  FormField,
  Select,
  Datepicker,
} from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  index: number;
  children?: React.ReactNode;
  name: string;
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
`;

export default function EmissionFactor({ index, children, name }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Commondity">
        <input
          {...register(`${name}.${index}.commondity`, {
            required: 'Field is required',
          })}
        />
        <ErrorMessage
          name={`${name}.${index}.commondity`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Factor">
        <input
          {...register(`${name}.${index}.factors`, {
            required: 'Field is required',
          })}
        />
        <ErrorMessage
          name={`${name}.${index}.factors`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <Select
        label="Units"
        name={`${name}.${index}.units`}
        required
        options={[
          {
            label: 'Please select units',
            value: 'none',
          },
          {
            label: '°F',
            value: '°F',
          },
          {
            label: '°C',
            value: '°C',
          },
        ]}
      />
      <FormField label="Timestamp">
        <Datepicker name={`${name}.${index}.time`} required />
        <ErrorMessage
          name={`${name}.${index}.time`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      {children}
    </Wrapper>
  );
}
