import { render } from '@testing-library/react';

import { BackgroundText } from './background-text';

describe('BackgroundText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackgroundText />);
    expect(baseElement).toBeTruthy();
  });
});
