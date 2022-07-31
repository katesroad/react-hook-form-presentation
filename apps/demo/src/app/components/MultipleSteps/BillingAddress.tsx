import { Button, FormField } from '@react-hook-form/shared-components';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormCard from './FormCard';

import formContext, { FormValues } from './FormContext';

const BillingAddress = () => {
  const { formValues, currentStep, setCurrentStep, updateFormValues } =
    useContext(formContext)!;

  const {
    reset,
    register,
    handleSubmit,
    formState: {
      errors: { address },
    },
  } = useForm({
    mode: 'all',
    // It is important to set defaultValues if you want to access error message without warning
    defaultValues: {
      address: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    updateFormValues(data);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    reset({
      address: formValues['address'] ?? '',
    });
  }, [formValues, reset]);

  const errMsg = address?.['message'];

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Billing Address" errMsg={errMsg}>
          <input
            autoFocus
            {...register('address', {
              required: 'Billing address is required',
            })}
          />
        </FormField>
        <Button type="submit">Next</Button>
      </form>
    </FormCard>
  );
};

export default BillingAddress;
