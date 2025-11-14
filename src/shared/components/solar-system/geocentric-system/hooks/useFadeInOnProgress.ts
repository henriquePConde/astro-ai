import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export function useFadeInOnProgress(fadeOutDuration = 700) {
  const { progress } = useProgress();
  const [canAnimate, setCanAnimate] = useState(false);
  const [loadingOpacity, setLoadingOpacity] = useState(1);

  useEffect(() => {
    if (progress === 100) {
      const start = performance.now();

      const fade = (timestamp: number) => {
        const elapsed = timestamp - start;
        const opacity = Math.max(1 - elapsed / fadeOutDuration, 0);
        setLoadingOpacity(opacity);

        if (opacity > 0) {
          requestAnimationFrame(fade);
        } else {
          setCanAnimate(true);
        }
      };

      requestAnimationFrame(fade);
    }
  }, [progress, fadeOutDuration]);

  return { canAnimate, loadingOpacity, progress };
}
