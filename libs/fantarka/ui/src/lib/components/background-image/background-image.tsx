import React, { useRef, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  AnimateImage,
  AnimateImageAnimationStyle,
} from '@dctjs-monorepo/shared-ui';
import { PageMainContext } from '../page-main/page-main-provider';
import { SectionContols } from '../section-controls/section-controls';
import './background-image.css';

export interface BackgroundImageProps {
  onLoadComplete: () => void;
}

const ANIMATE_OPTIONS: Record<
  AnimateImageAnimationStyle,
  { style: AnimateImageAnimationStyle; pixels: number }
> = {
  disabled: { style: 'disabled', pixels: 0 },
  center: { style: 'center', pixels: 5 },
  random: { style: 'center', pixels: 5 },
};

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  onLoadComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageCtx = useContext(PageMainContext);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
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
      <div className="fixed w-full h-full top-[20%] left-0 flex flex-col items-center">
        <div
          className={`w-[calc(100%-16px)] sm:max-w-[610px] md:max-w-[736px] lg:max-w-[1008px] xl:max-w-[1264px] 2xl:max-w-[1520px]`}
        >
          <div className="flex justify-center">
            <canvas
              aria-label={
                pageCtx?.tracks[pageCtx.activeTitle].artworkDescription
              }
              className="aspect-square w-[200px] md:w-1/2 max-w-[400px] rounded-2xl"
              ref={canvasRef}
            ></canvas>
          </div>
        </div>
        <SectionContols></SectionContols>
      </div>
    </AnimateImage>
  );
};
