import { useEffect, useState } from 'react';

export const useIsVisible = (
  ref: React.RefObject<Element | undefined>,
  options = {}
) => {
  const [isVisible, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);


    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isVisible;
};
