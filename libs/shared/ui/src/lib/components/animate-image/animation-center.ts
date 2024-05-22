import { PixelContainer } from './interfaces';

const animationCenter = (
  ctx: CanvasRenderingContext2D,
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
      container.activeX += (container.x - container.activeX) * 0.05;
      container.activeY += (container.y - container.activeY) * 0.05;
      ctx.putImageData(
        container.pixelData,
        container.activeX,
        container.activeY
      );
    } else {
      ctx.putImageData(container.pixelData, container.x, container.y);
    }
  });

  if (!allReturned) {
    requestAnimationFrame(() =>
      animationCenter(ctx, pixels, pixelSize, onLoadComplete)
    );
  } else {
    pixels.length > 0 && onLoadComplete();
  }
};

export default animationCenter;
