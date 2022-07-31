import { FormField } from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

type Props = {
  index: number;
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

export default function AuthedBy({ index }: Props) {
  const { register } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Name">
        <input {...register(`authedBy.${index}.name`)} />
      </FormField>
      <FormField label="Role">
        <input {...register(`class.${index}.role`)} />
      </FormField>
    </Wrapper>
  );
}
