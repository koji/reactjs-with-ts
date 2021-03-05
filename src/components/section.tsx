import React, { createContext, useRef, useContext } from 'react';
import { useFrame, useThree } from "react-three-fiber";
import lerp from "lerpjs";
import { settings } from "./config";

const offsetContext = createContext(0);
// ToDo remove any

export const Section = ({ children, offset, factor, ...props} : any) => {
  const { offset: parentOffset, sectionHeight, aspect } = useSection();
  const ref: any = useRef();
  offset = offset !== undefined ? offset : parentOffset;
  useFrame(() => {
    if(ref) {
      const curY = ref.current!.position.y;
      const curTop = (settings.top.current) as number / aspect;
      ref.current.position.y = lerp(curY, (curTop / settings.zoom) * factor, 0.1);
    }

  });
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );

}

export const useSection = () => {
  const { sections, pages, zoom } = settings;
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth / zoom;
  const canvasHeight = viewportHeight / zoom;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  const aspect = size.height / viewportHeight;
  return {
    aspect,
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
  };
}