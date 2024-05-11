import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export interface BackgroundImageProps {
  imageUrl: string | null;
  totalPixelContainers: number;
  onLoadComplete: () => void;
}

interface PixelContainer {
  x: number;
  y: number;
  pixelData: ImageData;
  activeX: number;
  activeY: number;
}

const animateLoad = (
  ctx: any,
  pixels: PixelContainer[],
  pixelSize: number,
  onLoadComplete: () => void
) => {
  let allReturned = true;
  pixels.forEach((container) => {
    if (
      Math.abs(container.activeX - container.x) > 0.1 ||
      Math.abs(container.activeY - container.y) > 0.1
    ) {
      allReturned = false;
      container.activeX +=
        (container.x - container.activeX) * Math.random() * 0.4;
      container.activeY +=
        (container.y - container.activeY) * Math.random() * 0.4;
      ctx.clearRect(container.activeX, container.activeY, pixelSize, pixelSize);
      ctx.putImageData(
        container.pixelData,
        container.activeX,
        container.activeY
      );
    } else {
      ctx.clearRect(container.x, container.y, pixelSize, pixelSize);
      ctx.putImageData(container.pixelData, container.x, container.y);
    }
  });

  if (!allReturned) {
    requestAnimationFrame(() =>
      animateLoad(ctx, pixels, pixelSize, onLoadComplete)
    );
  } else {
    pixels.length > 0 && onLoadComplete();
  }
};

const animateUpdate = (
  ctx: any,
  pixels: PixelContainer[],
  pixelSize: number,
  onLoadComplete: () => void
) => {
  const displayPixels: PixelContainer[] = [];

  for (
    let i = Math.min(pixels.length / 10, pixels.length - 1);
    i > -1;
    i -= 1
  ) {
    const idx = Math.floor(Math.random() * pixels.length);
    displayPixels.push(pixels[idx]);
    pixels.splice(idx, 1);
  }

  displayPixels.forEach((container) => {
    ctx.clearRect(container.x, container.y, pixelSize, pixelSize);
    ctx.putImageData(container.pixelData, container.x, container.y);
  });

  if (pixels.length > 0) {
    requestAnimationFrame(() =>
      animateUpdate(ctx, pixels, pixelSize, onLoadComplete)
    );
  } else {
    onLoadComplete();
  }
};

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  totalPixelContainers,
  onLoadComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasData = useRef<{
    width: number;
    height: number;
    pixelSize: number;
  } | null>(null);
  const canvasRefHidden = useRef<HTMLCanvasElement>(null);
  const canvasInitialized = useRef<boolean>(false);
  const [imageData, setImageData] = useState<{
    image: HTMLImageElement | undefined;
    animate: boolean;
  }>();
  const [pixels, setPixels] = useState<PixelContainer[]>([]);
  const isLandscape = useMediaQuery({ query: '(orientation: lanscape)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    const img = new Image();
    img.onload = () =>
      setImageData({ image: img, animate: !isLandscape && !isTabletOrMobile });
    img.src = imageUrl;
    img.width = 500;
    img.height = 500;
  }, [imageUrl, isLandscape, isTabletOrMobile]);

  useEffect(() => {
    const canvas = canvasRefHidden.current;

    if (!canvas || !imageData || !imageData.image || !imageData.animate) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) {
      return;
    }

    const pixelContainers: PixelContainer[] = [];

    canvas.width = imageData.image.width;
    canvas.height = imageData.image.height;
    const pixelSize = canvas.width / totalPixelContainers;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    canvasData.current = {
      width: canvas.width,
      height: canvas.height,
      pixelSize,
    };

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageData.image, 0, 0, canvas.width, canvas.height);

    if (isLandscape || isTabletOrMobile) {
      return;
    }

    for (let y = 0; y < totalPixelContainers; y++) {
      for (let x = 0; x < totalPixelContainers; x++) {
        const posX = x * pixelSize;
        const posY = y * pixelSize;
        const pixelData = ctx.getImageData(posX, posY, pixelSize, pixelSize);

        pixelContainers.push({
          x: posX,
          y: posY,
          pixelData: pixelData,
          activeX: centerX,
          activeY: centerY,
        });
      }
    }
    setPixels(pixelContainers);
  }, [imageData]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }

    if (!canvasInitialized.current && pixels.length > 0) {
      canvas.width = canvasRefHidden.current?.width || 0;
      canvas.height = canvasRefHidden.current?.height || 0;
    }

    if (canvasInitialized.current) {
      animateUpdate(
        ctx,
        pixels,
        canvasData.current?.pixelSize || 0,
        onLoadComplete
      );
      canvasInitialized.current = true;
      return;
    }
    canvasInitialized.current = pixels.length > 0;

    requestAnimationFrame(() =>
      animateLoad(
        ctx,
        pixels,
        canvasData.current?.pixelSize || 0,
        onLoadComplete
      )
    );
  }, [pixels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!imageData?.image || imageData.animate) {
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
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imageData?.image &&
      ctx.drawImage(imageData.image, 0, 0, canvas.width, canvas.height);

    canvasInitialized.current = true;
    onLoadComplete();
  }, [imageData]);

  return (
    <>
      <canvas
        className="w-screen h-screen fixed top-0 left-0 -z-10"
        ref={canvasRef}
      ></canvas>
      <canvas
        className="w-screen h-screen fixed top-0 left-[100%] -z-10"
        ref={canvasRefHidden}
      ></canvas>
    </>
  );
};
