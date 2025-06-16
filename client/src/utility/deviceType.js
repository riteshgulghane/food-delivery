import { useState, useEffect, useMemo } from 'react';

export const DEVICE_TYPE = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
};

// Memoized device type calculation to avoid recalculating on every render
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return DEVICE_TYPE.MOBILE;
  } else if (width >= 768 && width < 1024) {
    return DEVICE_TYPE.TABLET;
  } else {
    return DEVICE_TYPE.DESKTOP;
  }
};

// Debounce function to limit the frequency of function calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Cache for device type to avoid unnecessary recalculations
let cachedDeviceType = null;

const useDeviceType = () => {
  // Initialize state with cached value if available, otherwise calculate
  const [deviceType, setDeviceType] = useState(() => {
    if (cachedDeviceType === null) {
      cachedDeviceType = getDeviceType();
    }
    return cachedDeviceType;
  });

  useEffect(() => {
    // Debounce resize handler to prevent excessive updates
    const handleResize = debounce(() => {
      const newDeviceType = getDeviceType();
      if (newDeviceType !== cachedDeviceType) {
        cachedDeviceType = newDeviceType;
        setDeviceType(newDeviceType);
      }
    }, 250); // 250ms debounce delay

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return memoized device type to prevent unnecessary re-renders
  return useMemo(() => deviceType, [deviceType]);
};

export default useDeviceType;
