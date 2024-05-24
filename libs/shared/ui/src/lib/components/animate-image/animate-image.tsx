import React, { useRef, useEffect, useState } from 'react';

import {
  AnimateImageAnimationOptions,
  AnimateImageProps,
  PixelContainer,
} from './interfaces';

import animationCenter from './animation-center';
import animationRandom from './animation-random';

export const AnimateImage: React.FC<AnimateImageProps> = ({
  options,
  canvasRef,
  children,
  imageUrl,
  onLoadComplete,
}) => {
  const canvasData = useRef<{
    width: number;
    height: number;
    pixelSize: number;
  } | null>(null);
  const canvasRefHidden = useRef<HTMLCanvasElement>(null);
  const canvasInitialized = useRef<boolean>(false);
  const previousImage = useRef<string | undefined>();
  const [imageData, setImageData] = useState<{
    image: HTMLImageElement | undefined;
    options: AnimateImageAnimationOptions;
  }>();
  const [pixels, setPixels] = useState<PixelContainer[]>([]);

  useEffect(() => {
    if (!imageUrl || imageUrl === previousImage.current) {
      return;
    }

    previousImage.current = imageUrl;

    const img = new Image();
    img.onload = () => setImageData({ image: img, options });
    img.src = imageUrl;
    img.style.borderRadius = '1rem';
    img.crossOrigin = 'anonymous';
  }, [imageUrl, options]);

  useEffect(() => {
    const canvas = canvasRefHidden.current;

    if (!canvas || !imageData || !imageData.image) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) {
      return;
    }

    const pixelContainers: PixelContainer[] = [];

    canvas.width = imageData.image.width;
    canvas.height = imageData.image.height;

    const pixelSize = canvas.width / options.pixels;
    const centerX = canvas.width / 2 - pixelSize / 2;
    const centerY = canvas.height / 2 - pixelSize / 2;

    canvasData.current = {
      width: canvas.width,
      height: canvas.height,
      pixelSize,
    };

    ctx.drawImage(imageData.image, 0, 0, canvas.width, canvas.height);

    for (let y = 0; y < options.pixels; y++) {
      for (let x = 0; x < options.pixels; x++) {
        const posX = x * pixelSize;
        const posY = y * pixelSize;
        const pixelData = ctx.getImageData(posX, posY, pixelSize, pixelSize);

        pixelContainers.push({
          x: posX,
          y: posY,
          pixelData: pixelData,
          activeX: centerX, // (posX / 2) - pixelSize / 2,
          activeY: centerY, // (posY / 2) - pixelSize / 2,
        });
      }
    }

    setPixels(pixelContainers);
  }, [imageData, options.pixels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (options.style === 'disabled' || !canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
      alpha: false,
    });

    if (!ctx) {
      return;
    }

    if (
      pixels.length > 0 &&
      canvasRefHidden.current &&
      canvasRefHidden.current.width > 0
    ) {
      if (!canvasInitialized.current) {
        canvasRef.current.width = canvasRefHidden.current.width;
        canvasRef.current.height = canvasRefHidden.current.height;
        canvasInitialized.current = true;
      }
      if (options.style === 'center') {
        animationCenter(
          ctx,
          pixels,
          canvasData.current?.pixelSize || 0,
          onLoadComplete
        );
      }

      if (options.style === 'random') {
        animationRandom(
          ctx,
          pixels,
          canvasData.current?.pixelSize || 0,
          onLoadComplete
        );
      }
    }
  }, [options, pixels, canvasRef, onLoadComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!imageData?.image || imageData.options.style !== 'disabled') {
      return;
    }

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    imageData?.image &&
      ctx.drawImage(imageData.image, 0, 0, canvas.width, canvas.height);

    canvasInitialized.current = true;
    onLoadComplete();
  }, [imageData, onLoadComplete, canvasRef]);

  return (
    <>
      {children}
      <canvas
        className="w-full, h-full fixed top-0 left-[100%] rounded-2xl"
        ref={canvasRefHidden}
      ></canvas>
    </>
  );
};
