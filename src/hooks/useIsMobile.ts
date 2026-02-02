import { useEffect, useState } from "react";

const breakpoints = {
  sm: 640,
  lg: 1024,
};

const useResponsive = () => {
  const getState = () => {
    const width = window.innerWidth;

    return {
      isMobile: width < breakpoints.sm,
      isTablet: width >= breakpoints.sm && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
    };
  };

  const [state, setState] = useState(getState);

  useEffect(() => {
    const handleResize = () => setState(getState());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
};

export default useResponsive;
