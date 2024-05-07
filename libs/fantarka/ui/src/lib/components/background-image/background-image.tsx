import React, { useRef, useEffect, useState, useContext } from 'react';

export interface BackgroundImageProps {
  imageUrl: string | null;
  totalPixelContainers: number;
}

interface PixelContainer {
  x: number;
  y: number;
  pixelData: ImageData;
  activeX: number;
  activeY: number;
}

const animateLoad = (ctx: any, pixels: PixelContainer[], pixelSize: number) => {
  let allReturned = true;
  pixels.forEach((container) => {
    if (
      Math.abs(container.activeX - container.x) > 0.1 ||
      Math.abs(container.activeY - container.y) > 0.1
    ) {
      allReturned = false;
      // console.log('XXX ',  Math.random() * 0.1);
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
    requestAnimationFrame(() => animateLoad(ctx, pixels, pixelSize));
  }
};

const animateUpdate = (
  ctx: any,
  pixels: PixelContainer[],
  pixelSize: number
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
    requestAnimationFrame(() => animateUpdate(ctx, pixels, pixelSize));
  }
};

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  totalPixelContainers,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasData = useRef<{
    width: number;
    height: number;
    pixelSize: number;
  } | null>(null);
  const canvasRefHidden = useRef<HTMLCanvasElement>(null);
  const canvasInitialized = useRef<boolean>(false);
  const [pixels, setPixels] = useState<PixelContainer[]>([]);

  useEffect(() => {
    const canvas = canvasRefHidden.current;

    if (!canvas || !imageUrl) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }

    const pixelContainers: PixelContainer[] = [];

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      const pixelSize = canvas.width / totalPixelContainers;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      canvasData.current = {
        width: canvas.width,
        height: canvas.height,
        pixelSize,
      };

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

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
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    image.src = imageUrl;
    image.width = 500; ///window.innerWidth;
    image.height = 500; //window.innerHeight;
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }

    if (!canvasInitialized.current) {
      canvas.width = canvasRefHidden.current?.width || 0;
      canvas.height = canvasRefHidden.current?.height || 0;
    }

    if (canvasInitialized.current) {
      animateUpdate(ctx, pixels, canvasData.current?.pixelSize || 0);
      return;
    }
    canvasInitialized.current = pixels.length > 0;

    requestAnimationFrame(() =>
      animateLoad(ctx, pixels, canvasData.current?.pixelSize || 0)
    );
  }, [pixels]);

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
