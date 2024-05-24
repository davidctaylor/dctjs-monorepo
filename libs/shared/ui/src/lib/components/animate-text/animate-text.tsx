import React, { useRef, useEffect, useState, RefObject, ReactNode } from 'react';

interface AnimateTextProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  children: ReactNode;
  inputText: string | undefined;
}

interface Pixel {
  x: number;
  y: number;
  direction: number;
  speed: number;
}

export const AnimateText: React.FC<AnimateTextProps> = ({ canvasRef, children, inputText }) => {
  const previousText = useRef<string | undefined>();
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [prevPixels, setPrevPixels] = useState<Pixel[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const prevInputTextRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!canvasRef.current || !inputText || inputText === previousText.current) {
      return;
    }

    previousText.current = inputText;

    const canvas = canvasRef.current;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = 200;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '36px Syncopate';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';
    context.fillText(inputText, centerX, centerY);

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;
    const newPixels: Pixel[] = [];
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        if (
          imageData[index] === 255 &&
          imageData[index + 1] === 255 &&
          imageData[index + 2] === 255
        ) {
          newPixels.push({
            x,
            y,
            speed: Math.random() * 2 + 3,
            direction: Math.random() * Math.PI * 2, // Random direction
          });
        }
      }
    }


    if (prevInputTextRef.current && prevInputTextRef.current !== inputText) {
      setPrevPixels(() => pixels);
      setIsAnimating(true);
    }
    setPixels(() => newPixels);
    prevInputTextRef.current = inputText;
  }, [canvasRef, inputText, pixels]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      if (!inputText) {
        return;
      }
      prevPixels.map((pixel) => {
        pixel.x += Math.cos(pixel.direction) * pixel.speed;
        pixel.y += Math.sin(pixel.direction) * pixel.speed;
        context.fillRect(pixel.x, pixel.y, 1, 1);
        return pixel;
      });

      const centerX = canvas.width / 2;
      const centerY = 200;
      context.fillText(inputText, centerX, centerY);

      if (
        prevPixels.every(
          (p) => p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height
        )
      ) {
        setIsAnimating(false);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isAnimating) {
      animate();
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [canvasRef, isAnimating, pixels, inputText, prevPixels]);

  return (
    <> {children}</>
  );
};
