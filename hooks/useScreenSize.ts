import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeState = (e: UIEvent) => {
      if (!e?.target) return;
      const target = e.target as Window;
      setScreenHeight(target.innerHeight);
      setScreenWidth(target.innerWidth);
    };
    window.addEventListener('resize', changeState);
    return () => window.removeEventListener('resize', changeState);
  }, []);

  return { screenHeight, screenWidth };
}
