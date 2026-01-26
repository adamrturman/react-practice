import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, timeout = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //  After one second, update the value
  //  This is useful because if a user types a long input, we won't update
  //  until 1 second until after the user finishes
  //  Any intermediary updates are cancelled on the next update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [value, timeout]);

  return debouncedValue;
}
