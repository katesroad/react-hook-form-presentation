import { Button } from '@react-hook-form/shared-components';
import { useState } from 'react';
import styled from 'styled-components';
import BillingAddress from './BillingAddress';
import BillingConformation from './BillingConfirmation';
import BillingInfo from './BillingInfo';

import formContext from './FormContext';

type FormValues = Record<string, string | boolean>;

const Wrapper = styled.main`
  margin: 2rem auto;
`;

export default function MultipleStepsForm() {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  console.info(formValues);

  const handleButtonClick = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const updateFormValues = (newValues: FormValues) => {
    setFormValues({
      ...formValues,
      ...newValues,
    });
  };

  return (
    <Wrapper>
      <formContext.Provider
        value={{
          currentStep,
          formValues,
          setCurrentStep,
          updateFormValues,
        }}
      >
        <h3>Step {currentStep} of 3</h3>
        {currentStep > 1 && <Button onClick={handleButtonClick}>Back</Button>}

        {currentStep === 1 && <BillingInfo />}
        {currentStep === 2 && <BillingAddress />}
        {currentStep === 3 && <BillingConformation />}

        {currentStep === 4 && <p>{JSON.stringify(formValues)}</p>}
      </formContext.Provider>
    </Wrapper>
  );
}
