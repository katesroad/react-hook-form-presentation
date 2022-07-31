import { FormField } from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

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
  const { register } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Group">
        <input {...register(`${name}.${index}.group`)} />
      </FormField>
      <FormField label="Limit">
        <input {...register(`${name}.${index}.limit`)} />
      </FormField>
      <FormField label="Units">
        <input {...register(`${name}.${index}.units`)} />
      </FormField>
      {children}
    </Wrapper>
  );
}
