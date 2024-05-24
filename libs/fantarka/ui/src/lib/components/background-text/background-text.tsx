import React, { useRef, useContext } from 'react';

import { AnimateText } from '@dctjs-monorepo/shared-ui';
import { PageMainContext } from '../page-main/page-main-provider';

/* eslint-disable-next-line */
interface BackgroundTextProps {}

interface Pixel {
  x: number;
  y: number;
  direction: number;
  speed: number;
}

export const BackgroundText: React.FC<BackgroundTextProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageCtx = useContext(PageMainContext);

  return (
    <>
      {pageCtx?.refreshActive === 'active' && (
        <AnimateText
          canvasRef={canvasRef}
          inputText={pageCtx?.tracks[pageCtx?.activeTitle].title}
        >
          <canvas
            className="fixed top-0 left-0 -z-10 bg-transparent"
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </AnimateText>
      )}
    </>
  );
};
