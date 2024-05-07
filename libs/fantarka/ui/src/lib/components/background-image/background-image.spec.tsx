import { render } from '@testing-library/react';

import BackgroundImage from './background-image';

describe('BackgroundImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackgroundImage />);
    expect(baseElement).toBeTruthy();
  });
});
