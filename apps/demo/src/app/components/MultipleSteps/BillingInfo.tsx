import { Button, FormField } from '@react-hook-form/shared-components';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormCard from './FormCard';

import formContext, { FormValues } from './FormContext';

const BillingInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { currentStep, formValues, setCurrentStep, updateFormValues } =
    useContext(formContext)!;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    updateFormValues(data);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    reset({
      email: formValues['email'] ?? '',
    });
  }, [formValues, reset]);

  const errMsg = errors['email']?.message;

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email" errMsg={errMsg}>
          <input
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please input a valid email',
              },
            })}
          />
        </FormField>
        <Button type="submit">Next</Button>
      </form>
    </FormCard>
  );
};

export default BillingInfo;
