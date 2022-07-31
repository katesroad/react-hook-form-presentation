import {
  FormField,
  Select,
  Datepicker,
} from '@react-hook-form/shared-components';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

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
  const { register } = useFormContext();

  return (
    <Wrapper>
      <FormField label="Commondity">
        <input {...register(`${name}.${index}.commondity`)} />
      </FormField>
      <FormField label="Factor">
        <input {...register(`${name}.${index}.factors`)} />
      </FormField>
      <Select
        label="Units"
        name={`${name}.${index}.units`}
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
        <Datepicker name={`${name}.${index}.factors`} />
      </FormField>
      {children}
    </Wrapper>
  );
}
