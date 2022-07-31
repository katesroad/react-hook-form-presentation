import React from 'react';

type FormValues = {
  email?: string;
  address?: string;
  confirmed?: boolean;
};

type FormContextType = {
  currentStep: number;
  formValues: FormValues;
  updateFormValues: (update: FormValues) => void;
  setCurrentStep: (step: number) => void;
};

const formContext = React.createContext<FormContextType | null>(null);

export default formContext;

export type { FormValues };
