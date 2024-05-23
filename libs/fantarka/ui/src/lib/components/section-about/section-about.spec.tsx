import { render } from '@testing-library/react';

import { SectionAbout } from './section-about';

describe('SectionAbort', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionAbout />);
    expect(baseElement).toBeTruthy();
  });
});
