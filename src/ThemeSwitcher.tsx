import { useCallback, useState } from 'react';
import FibButton from './FibButton';

export default function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fib, setFib] = useState({ current: 0, previous: 0 })

// Memoize to prevent FibButton re-renders when theme changes
  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);


  //  Avoids recreating this function when ever the theme is toggled, which when
  //  combined with the memoization of FibButton, keeps that component from rerendering
  //  when the number (or theme changes)
  const incrementFibonacci = useCallback(() => {
    setFib(({ current, previous }) => {
      if (current === 0 || current === 1) {
        return { current: current + 1, previous: current }
      }
      return { current: previous + current, previous: current }
    })
  }, []) // No dependencies needed!


  return (
    <div style={{'backgroundColor': isDarkTheme ? 'black' : 'white', 'height': '90vh', 'width': '90vw'}}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <FibButton onClick={incrementFibonacci} />
      <p>{fib.current}</p>
    </div>
  );
}
