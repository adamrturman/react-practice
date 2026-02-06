import { useState, useEffect } from 'react';

type Mode = 'mobile' | 'desktop';

const MOBILE_BREAKPOINT = 500;

export function useMediaQuery(): Mode {
  const [mode, setMode] = useState<Mode>(() =>
    window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = () => {
      setMode(mediaQuery.matches ? 'mobile' : 'desktop');
    };

    // Sync state immediately in case it changed between render and effect
    handleChange();

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return mode;
}
