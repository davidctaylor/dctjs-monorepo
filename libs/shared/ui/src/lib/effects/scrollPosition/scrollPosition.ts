import { useEffect, useState } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (
  trackPosition = true,
  el?: HTMLElement
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const updatePosition = () => {
      trackPosition &&
        setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };
    el
      ? el.addEventListener('scroll', updatePosition, {})
      : window.addEventListener('scroll', updatePosition);
    updatePosition();
        
    return () => window.removeEventListener('scroll', updatePosition);
  }, [trackPosition, el]);

  return scrollPosition;
};
