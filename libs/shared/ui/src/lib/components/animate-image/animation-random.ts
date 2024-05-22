import { PixelContainer } from './interfaces';

const animationRandom = (
  ctx: CanvasRenderingContext2D,
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

  displayPixels.forEach((container) =>
    ctx.putImageData(container.pixelData, container.x, container.y)
  );

  if (pixels.length > 0) {
    requestAnimationFrame(() =>
      animationRandom(ctx, pixels, pixelSize, onLoadComplete)
    );
  } else {
    onLoadComplete();
  }
};

export default animationRandom;
