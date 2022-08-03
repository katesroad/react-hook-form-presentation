import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
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

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Not required field">
        {/* register your input into the hook by invoking the "register" function */}
        <input {...register('example')} />

        {/* include validation with required or other standard HTML validation rules */}
        <ErrorMessage
          name="example"
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Required Field">
        <input
          {...register('exampleRequired', { required: 'Required Field' })}
        />
        {/* errors will return when field validation fails  */}
        <ErrorMessage
          name="exampleRequired"
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Email Field">
        <input
          {...register('email', {
            required: 'Required Field',
            pattern: {
              value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              message: 'Please fill a valid email',
            },
          })}
        />
        {/* errors will return when field validation fails  */}
        <ErrorMessage
          name="email"
          errors={errors}
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField>
        <Button type="submit">submit</Button>
      </FormField>
    </form>
  );
}
