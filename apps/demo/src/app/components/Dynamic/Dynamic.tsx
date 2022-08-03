import { Button, Select } from '@react-hook-form/shared-components';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetClassTypes, useGetLimits } from './queries';

export default function Dynamic() {
  const methods = useForm({
    defaultValues: {
      classType: '',
      limit: '',
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.info(data);
  });

  const classType = methods.watch('classType');

  const { data: classTypes, isLoading: isLoadingClassTypes } =
    useGetClassTypes();

  const { data: limits, isLoading: isLoadingLimits } = useGetLimits(
    methods.getValues('classType')
  );

  useEffect(() => {
    methods.setValue('limit', '', {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [classType, methods]);

  return (
    <FormProvider {...methods}>
      {/* https://react-hook-form.com/advanced-usage#FormProviderPerformance */}
      <form action="" onSubmit={handleSubmit}>
        <h3>Model information</h3>
        <Select
          label="class type"
          name="classType"
          disabled={isLoadingClassTypes}
          required
          options={[
            {
              label: isLoadingClassTypes
                ? `Is fetching class types...`
                : 'Please select class type',
              value: '',
            },
            ...(classTypes ?? []),
          ]}
        />
        <Select
          label="limit"
          name="limit"
          disabled={!classType}
          required
          options={[
            {
              label:
                !!classType && isLoadingLimits
                  ? `Is fetching limit...`
                  : 'Please select limit',
              value: '',
            },
            ...(limits ?? []),
          ]}
        />
        <Button
          type="submit"
          disabled={!methods.formState.isValid && methods.formState.isDirty}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
