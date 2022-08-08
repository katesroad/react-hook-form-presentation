import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { FormField } from '@react-hook-form/shared-components';

type UserData = {
  firstName: string;
  lastName: string;
};

const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: UserData) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as any).inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
});

export default function YupValidation() {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver,
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormField label="Last Name">
        <input {...register('lastName')} />
        <ErrorMessage
          errors={errors}
          name="lastName"
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="First Name">
        <input {...register('firstName')} />
        <ErrorMessage
          errors={errors}
          name="firstName"
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <input type="submit" />
    </form>
  );
}
