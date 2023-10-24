import { useEffect, useState } from "react";

interface IWindowSizeState {
  width: number | undefined;
  height: number | undefined;
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IWindowSizeState>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
