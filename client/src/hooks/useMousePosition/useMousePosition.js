import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return mousePosition;
};
