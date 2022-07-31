import { FormField } from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

export default function RequireAuth() {
  const { register } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Name">
        <input {...register(`authedBy.name`)} />
      </FormField>
      <FormField label="Role">
        <input {...register(`authedBy.role`)} />
      </FormField>
    </Wrapper>
  );
}
