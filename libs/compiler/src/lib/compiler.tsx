import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CompilerProps {}

const StyledCompiler = styled.div`
  color: pink;
`;

export function Compiler(props: CompilerProps) {
  return (
    <StyledCompiler>
      <h1>Welcome to Compiler!</h1>
    </StyledCompiler>
  );
}

export default Compiler;
