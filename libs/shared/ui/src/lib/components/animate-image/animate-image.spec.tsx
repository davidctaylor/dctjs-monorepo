import { render } from '@testing-library/react';

import { AnimateImage } from './animate-image';
import React from 'react';

describe('AnimateImage', () => {
  it('should render successfully', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    const ref = React.createRef<HTMLCanvasElement | null>();
   
    const { baseElement } = render(<AnimateImage imageUrl='test-image.png' canvasRef={ref} options={{ style: 'center', pixels: 5 }} onLoadComplete={() => {}}/>);
    expect(baseElement).toBeTruthy();
  });
});
