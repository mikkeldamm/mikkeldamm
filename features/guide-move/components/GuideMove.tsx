import { Children, cloneElement, RefObject, useEffect, useRef } from 'react';

import { gsap } from 'gsap/dist/gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

const STROKE_WIDTH = 2;
const BUFFER_SIZE = 2;

let rect: DOMRect;
let path: SVGPathElement | null = null;
let pathDataPoints: string;
let haveMoved = false;
let buffer: any[] = [];

let drawPadRefCurrent: SVGSVGElement | null = null;
let logoRefCurrent: SVGSVGElement | null = null;

type PointerPosition = {
  x: number;
  y: number;
};

const animateElement = (logoElement: SVGSVGElement, onComplete: () => void) => {
  if (!path) {
    return;
  }
  gsap.to(logoElement, {
    duration: 1.4,
    ease: 'power1.inOut',
    motionPath: {
      path: path,
      align: path,
      alignOrigin: [0.5, 0.5],
      offsetX: window.scrollX,
      offsetY: window.scrollY,
    },
    onComplete: onComplete,
  });
};

const getPointerPosition = (pointerEvent: PointerEvent): PointerPosition => {
  return {
    x: pointerEvent.pageX - window.scrollX - rect.left,
    y: pointerEvent.pageY - window.scrollY - rect.top,
  };
};

const getAveragePoint = (offset: number) => {
  const bufferLength = buffer.length;
  if (bufferLength % 2 === 1 || bufferLength >= BUFFER_SIZE) {
    let totalX = 0;
    let totalY = 0;
    let count = 0;
    for (let i = offset; i < bufferLength; i++) {
      count++;
      const pt = buffer[i];
      totalX += pt.x;
      totalY += pt.y;
    }
    return {
      x: totalX / count,
      y: totalY / count,
    };
  }
  return null;
};

const appendToBuffer = (pointerPosition: PointerPosition) => {
  buffer.push(pointerPosition);
  while (buffer.length > BUFFER_SIZE) {
    buffer.shift();
  }
};

const updateSvgPath = () => {
  if (!path) {
    return;
  }

  const averagePoint = getAveragePoint(0);
  if (!averagePoint) {
    console.log('No average point', path);
    return;
  }

  pathDataPoints += ' L' + averagePoint.x + ' ' + averagePoint.y;

  let tmpPath = '';
  for (let offset = 2; offset < buffer.length; offset += 2) {
    const newAveragePoint = getAveragePoint(offset);
    if (!newAveragePoint) {
      continue;
    }

    tmpPath += ' L' + newAveragePoint.x + ' ' + newAveragePoint.y;
  }

  console.log(pathDataPoints);

  path.setAttribute('d', pathDataPoints + tmpPath);
  haveMoved = true;
};

const clearPath = () => {
  if (!path) {
    return;
  }
  path.remove();
  path = null;
};

const resetLogoZIndex = () => {
  if (!logoRefCurrent) {
    return;
  }
  logoRefCurrent.style.zIndex = '40';
};

const handleOnPointerMove = (pointerEvent: PointerEvent) => {
  if (!path) {
    return;
  }
  const pointerPosition = getPointerPosition(pointerEvent);
  appendToBuffer(pointerPosition);
  console.log(pointerPosition);
  updateSvgPath();
};

const handleOnPointerUp = (_pointerEvent: PointerEvent) => {
  window.removeEventListener('pointermove', handleOnPointerMove);
  window.removeEventListener('pointerup', handleOnPointerUp);

  if (!drawPadRefCurrent || !logoRefCurrent) {
    return;
  }

  drawPadRefCurrent.style.pointerEvents = 'none';

  if (!haveMoved) {
    resetLogoZIndex();
    clearPath();
    return;
  }

  haveMoved = false;
  logoRefCurrent.style.zIndex = '100';

  animateElement(logoRefCurrent, () => {
    resetLogoZIndex();
    clearPath();
  });
};

const handleOnPointerDown = (
  pointerEvent: PointerEvent,
  drawPadRef: RefObject<SVGSVGElement>,
  logoRef: RefObject<SVGSVGElement>
) => {
  if (!drawPadRef.current) {
    return;
  }

  if (!logoRef.current) {
    return;
  }

  drawPadRefCurrent = drawPadRef.current;
  logoRefCurrent = logoRef.current;

  const body = document.querySelector('body');
  if (body) {
    body.style.userSelect = 'none';
  }

  window.addEventListener('pointermove', handleOnPointerMove);
  window.addEventListener('pointerup', handleOnPointerUp);

  if (path) {
    path.remove();
    path = null;
  }

  drawPadRefCurrent.style.pointerEvents = 'all';
  rect = drawPadRefCurrent.getBoundingClientRect();
  path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#000');
  path.setAttribute('stroke-width', STROKE_WIDTH.toString());
  buffer = [];

  const pointerPosition = getPointerPosition(pointerEvent);

  appendToBuffer(pointerPosition);

  pathDataPoints = 'M' + pointerPosition.x + ' ' + pointerPosition.y;
  path.setAttribute('d', pathDataPoints);
  drawPadRefCurrent.appendChild(path);
};

const GuideMove = ({ children }: any) => {
  const drawPadRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const logoChild = Children.only(children);

  useEffect(() => {
    if (!window) {
      return;
    }

    function onPointerDown(pointerEvent: PointerEvent) {
      handleOnPointerDown(pointerEvent, drawPadRef, logoRef);
    }

    gsap.registerPlugin(MotionPathPlugin);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <>
      {cloneElement(logoChild, { ref: logoRef })}
      <svg
        ref={drawPadRef}
        className="fixed inset-0 z-10 w-screen h-screen pointer-events-none"
      ></svg>
    </>
  );
};

export default GuideMove;
