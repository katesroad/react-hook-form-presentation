import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const Wrapper = styled.div`
  .label {
    display: block;
    margin: 0;
    text-transform: capitalize;
  }

  .control.inline {
    display: flex;
    align-items: center;

    input {
      margin: 0 0 0 4px;
    }
  }

  input,
  select {
    margin: 6px 0;
    border: 1px solid #eee;
    padding: 4px;
    border-radius: 2px;

    &: [type=checkbox] {
      cursor: pointer;
    }

    &:focus {
      border-color: blue;
    }

    &.error {
      border: 1px solid red;
    }
  }

  .error {
    margin-top: 4px;
    color: red;
    font-size: small;
  }
`;

const FieldGroupWrapper = styled.div`
  margin-bottom: 1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &.inline {
    display: flex;
    align-items: center;

    .form-field {
      margin-right: 1rem;
    }
  }
`;

export const FormField: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
  errMsg?: string | React.ReactNode;
  label?: string;
  inline?: boolean;
  className?: string;
}> = ({ children, className, errMsg, label, inline }) => (
  <Wrapper className={classNames(className, 'form-field')}>
    <div className={classNames('control', { inline })}>
      {label && <p className="label">{label}</p>}
      {children}
    </div>
    {errMsg && <p className="error">{errMsg}</p>}
  </Wrapper>
);

export const FormFieldGroup: React.FC<{
  children: React.ReactNode[];
  inline?: boolean;
  row?: boolean;
}> = ({ children, inline, row }) => (
  <FieldGroupWrapper
    className={classNames('form-field-group', {
      inline,
    })}
  >
    {children}
  </FieldGroupWrapper>
);
