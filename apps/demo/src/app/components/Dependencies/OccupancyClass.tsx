import { FormField } from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  index: number;
  children?: React.ReactNode | React.ReactNode[];
  name: string;
};

const Wrapper = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
`;

export default function OccupancyClass({ index, children, name }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Group">
        <input
          {...register(`${name}.${index}.group`, {
            required: 'Field is required',
          })}
        />
        <ErrorMessage
          name={`${name}.${index}.group`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Limit">
        <input
          {...register(`${name}.${index}.limit`, {
            required: 'Field is required',
          })}
        />
        <ErrorMessage
          name={`${name}.${index}.limit`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Units">
        <input
          {...register(`${name}.${index}.units`, {
            required: 'Field is required',
          })}
        />
        <ErrorMessage
          name={`${name}.${index}.units`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      {children}
    </Wrapper>
  );
}
