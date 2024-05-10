import { useEffect, useState } from 'react';

export type ScreenOrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';

export const useScreenOrientation = () => {
  const [screenOrientation, setScreenOrientation] = useState<ScreenOrientationType>('portrait-primary');
  useEffect(() => {
    const updateOrientation = (event: any) => {
      setScreenOrientation(event.target.type);
    };
    screen.orientation.addEventListener('change', updateOrientation);

    setScreenOrientation(screen.orientation.type);
    
    return () => window.removeEventListener('change',updateOrientation);
  }, []);

  return screenOrientation;
};
