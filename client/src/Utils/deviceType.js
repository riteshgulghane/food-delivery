import { useState, useEffect } from "react";

export const DEVICE_TYPE =  {
    MOBILE: "mobile",
    TABLET: "tablet",
    DESKTOP: "desktop"
}

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

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
