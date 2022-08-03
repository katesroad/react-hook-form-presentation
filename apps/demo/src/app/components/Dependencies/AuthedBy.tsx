import { FormField } from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

export default function AuthedBy() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Name">
        <input
          {...register(`authedBy.name`, {
            required: 'Please provided your name',
          })}
        />
        <ErrorMessage
          name={`authedBy.name`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Role">
        <input
          {...register(`authedBy.role`, {
            required: ' please provide your role',
          })}
        />
        <ErrorMessage
          name={`authedBy.role`}
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
    </Wrapper>
  );
}
