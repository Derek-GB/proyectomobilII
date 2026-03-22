import { useEffect, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const colorScheme = useNativeColorScheme();

  if (isHydrated) {
    return colorScheme;
  }

  return 'light';
}
