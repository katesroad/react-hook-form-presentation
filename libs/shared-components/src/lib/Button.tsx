import styled from 'styled-components';

const Button = styled.button`
  border: none;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
  min-width: 1rem;

  &: [disabled] {
    background-color: gray;
  }
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  button {
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
`;

export { ButtonGroup, Button };
