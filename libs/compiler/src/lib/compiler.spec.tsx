import { render } from '@testing-library/react';

import Compiler from './compiler';

describe('Compiler', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Compiler />);
    expect(baseElement).toBeTruthy();
  });
});
