import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 1rem 0;
`;

const FormCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

export default FormCard;
