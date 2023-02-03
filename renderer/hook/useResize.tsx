import React, { useEffect, useState } from "react";

export default function useResize() {
  const [resize, setResize] = useState({
    width: 0,
    height: 0,
  });

  const resizeHandle = () => {
    setResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    return () => window.removeEventListener("resize", resizeHandle);
  }, []);
  return resize;
}
