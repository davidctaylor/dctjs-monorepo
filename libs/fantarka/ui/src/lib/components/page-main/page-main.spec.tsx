import { render } from '@testing-library/react';

import PageMain from './page-main';

describe('PageMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageMain />);
    expect(baseElement).toBeTruthy();
  });
});
