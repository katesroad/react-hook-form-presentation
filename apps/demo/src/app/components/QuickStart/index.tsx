import { useForm } from 'react-hook-form';
import { Button, FormField } from '@react-hook-form/shared-components';

export default function QuickStart() {
  // All features are exposed via useForm hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit', // onChange, onSubmit, onBlur, all
  });

  const onSubmit = (data: Record<string, string>) => console.log(data);

  console.info(register('kate'));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Not required field">
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('example')} />

        {/* include validation with required or other standard HTML validation rules */}
      </FormField>
      <FormField label="Required Field">
        <input {...register('exampleRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        <p className="error">
          {errors['exampleRequired'] && <span>This field is required</span>}
        </p>
      </FormField>
      <FormField>
        <Button type="submit">submit</Button>
      </FormField>
    </form>
  );
}
