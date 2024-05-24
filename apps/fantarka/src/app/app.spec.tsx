import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText, getByRole } = render(<App />);
    const title = getByRole('heading', {level: 1});
    expect(title.textContent).toEqual('Fantarka');
  });
});
