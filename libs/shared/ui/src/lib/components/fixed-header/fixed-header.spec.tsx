import { render } from '@testing-library/react';

import FixedHeader from './fixed-header';

describe('FixedHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FixedHeader />);
    expect(baseElement).toBeTruthy();
  });
});
