import { render } from '@testing-library/react';

import BackgroundImage from './animate-image';

describe('BackgroundImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackgroundImage />);
    expect(baseElement).toBeTruthy();
  });
});
