import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// https://stackoverflow.com/questions/60864610/is-it-possible-to-use-react-datepicker-with-react-hooks-forms
// https://react-hook-form.com/api/usecontroller/controller

type Props = {
  name: string;
};

export function Datepicker({ name }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          placeholderText="Select date"
          onChange={(date: Date) => field.onChange(date.getTime())}
          selected={field.value}
        />
      )}
    />
  );
}
