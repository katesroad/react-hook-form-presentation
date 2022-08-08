import { useForm } from 'react-hook-form';
import { Button, FormField } from '@react-hook-form/shared-components';

export default function QuickStart() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      example: 'not required field value',
      exampleRequired: '',
    },
  });

  const onSubmit = (data: Record<string, string>) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="not required field">
        <span className="label">Not Required Field</span>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register('example')} />
        {/* include validation with required or other standard HTML validation rules */}
      </FormField>
      <FormField label="Required Field">
        <input {...register('exampleRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        <p className="error">
          {errors['exampleRequired'] && <span>This field is required</span>}
        </p>
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}
