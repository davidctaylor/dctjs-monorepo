import React, { useRef, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  AnimateImage,
  AnimateImageAnimationStyle,
} from '@dctjs-monorepo/shared-ui';
import { PageMainContext } from '../page-main/page-main-provider';
import './background-image.css';
import { SectionContols } from 'libs/fantarka/ui/src/lib/components/section-controls/section-controls';

export interface BackgroundImageProps {
  onLoadComplete: () => void;
}

const ANIMATE_OPTIONS: Record<
  AnimateImageAnimationStyle,
  { style: AnimateImageAnimationStyle; pixels: number }
> = {
  disabled: { style: 'disabled', pixels: 0 },
  center: { style: 'center', pixels: 10 },
  random: { style: 'center', pixels: 10 },
};

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  onLoadComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageCtx = useContext(PageMainContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      <AnimateImage
        options={
          isTabletOrMobile
            ? ANIMATE_OPTIONS['disabled']
            : Math.round(Math.random()) === 0
            ? ANIMATE_OPTIONS['center']
            : ANIMATE_OPTIONS['random']
        }
        canvasRef={canvasRef}
        imageUrl={pageCtx?.tracks[pageCtx.activeTitle].artworkUrl}
        onLoadComplete={onLoadComplete}
      >
        <div
          className={`fixed h-full top-[20%] -z-10 w-[calc(100%-16px)] sm:max-w-[610px] md:max-w-[736px] lg:max-w-[1008px] xl:max-w-[1264px] 2xl:max-w-[1520px] rounded-e-2xl`}
        >
          <div className="flex justify-center">
            <canvas
              className="aspect-square w-[200px] md:w-1/2 max-w-[400px]"
              ref={canvasRef}
            ></canvas>
          </div>
          <SectionContols></SectionContols>
        </div>
      </AnimateImage>
    </>
  );
};
