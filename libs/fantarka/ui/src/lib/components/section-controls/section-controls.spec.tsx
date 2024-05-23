import { render } from '@testing-library/react';

import { SectionContols } from './section-controls';

describe('SectionContols', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionContols />);
    expect(baseElement).toBeTruthy();
  });
});
