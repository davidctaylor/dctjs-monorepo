import { ReactNode, RefObject } from 'react';

export type AnimateImageAnimationStyle = 'disabled' | 'center' | 'random';
export interface AnimateImageAnimationOptions {
  style: AnimateImageAnimationStyle;
  pixels: number;
}
export interface AnimateImageProps {
  options: AnimateImageAnimationOptions;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  children?: ReactNode;
  imageUrl: string | null | undefined;
  onLoadComplete: () => void;
}

export interface PixelContainer {
  x: number;
  y: number;
  activeX: number;
  activeY: number;
  pixelData: ImageData;
}
