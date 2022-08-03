import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import {
  Button,
  FormField,
  FormFieldGroup,
} from '@react-hook-form/shared-components';

type UserData = {
  firstName: string;
  lastName: string;
};

type FormData = {
  user: UserData;
  organization: string;
  email: string;
  title?: string;
};

const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: FormData) => {
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
  user: yup
    .object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
    })
    .required('User is required'),
  organization: yup.string().required('Organization is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please provide a valid email'),
});

export default function YupValidation() {
  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver,
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormFieldGroup inline>
        <FormField label="Last Name">
          <input {...register('user.lastName')} />
          <ErrorMessage
            errors={errors}
            name="user.lastName"
            render={({ message }) => <p className="error">{message}</p>}
          />
        </FormField>
        <FormField label="First Name">
          <input {...register('user.firstName')} />
          <ErrorMessage
            errors={errors}
            name="user.firstName"
            render={({ message }) => <p className="error">{message}</p>}
          />
        </FormField>
      </FormFieldGroup>
      <FormField label="Organization">
        <input {...register('organization')} />
        <ErrorMessage
          errors={errors}
          name="organization"
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Email">
        <input {...register('email')} />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <FormField label="Title">
        <input {...register('title')} />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => <p className="error">{message}</p>}
        />
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  );
}
