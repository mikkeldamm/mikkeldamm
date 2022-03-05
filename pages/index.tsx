import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

import MainLayout from 'components/layouts/MainLayout';

export default function Home() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!window) {
      return;
    }

    var strokeWidth = 2;
    var bufferSize = 8;

    var rect: any;
    var path: SVGPathElement | null = null;
    var strPath: any;
    var anyMove = false;
    var buffer: any[] = []; // Contains the last positions of the mouse cursor

    const onMousedown = (e: any) => {
      if (!ref.current) {
        return;
      }

      window.addEventListener('mousemove', onMousemove);
      window.addEventListener('mouseup', onMouseup);

      document.getElementById('lars')?.remove();
      ref.current.style.pointerEvents = 'all';
      rect = ref.current.getBoundingClientRect();
      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#000');
      path.setAttribute('stroke-width', strokeWidth.toString());
      path.setAttribute('id', 'lars');
      buffer = [];
      var pt = getMousePosition(e);
      appendToBuffer(pt);
      strPath = 'M' + pt.x + ' ' + pt.y;
      path.setAttribute('d', strPath);
      ref.current.appendChild(path);
    };

    const onMousemove = (e: any) => {
      if (path) {
        anyMove = true;
        appendToBuffer(getMousePosition(e));
        updateSvgPath();
      }
    };

    const onMouseup = (e: any) => {
      path = null;
      window.removeEventListener('mousemove', onMousemove);
      window.removeEventListener('mouseup', onMouseup);
      if (ref.current) {
        ref.current.style.pointerEvents = 'none';
      }
      const larsenElm = document.getElementById('larsen');
      if (!larsenElm) {
        return;
      }

      if (!anyMove) {
        return;
      }

      anyMove = false;
      larsenElm.style.zIndex = '100';

      gsap.to(larsenElm, {
        duration: 1.4,
        ease: 'power1.inOut',
        motionPath: {
          path: '#lars',
          align: '#lars',
          alignOrigin: [0.5, 0.5],
          offsetX: window.scrollX,
          offsetY: window.scrollY,
        },
        onComplete: () => {
          larsenElm.style.zIndex = '40';
          document.getElementById('lars')?.remove();
        },
      });
    };

    var getMousePosition = function (e: any) {
      return {
        x: e.pageX - window.scrollX - rect.left,
        y: e.pageY - window.scrollY - rect.top,
      };
    };

    var appendToBuffer = function (pt: any) {
      buffer.push(pt);
      while (buffer.length > bufferSize) {
        buffer.shift();
      }
    };

    // Calculate the average point, starting at offset in the buffer
    var getAveragePoint = function (offset: any) {
      var len = buffer.length;
      if (len % 2 === 1 || len >= bufferSize) {
        var totalX = 0;
        var totalY = 0;
        var pt, i;
        var count = 0;
        for (i = offset; i < len; i++) {
          count++;
          pt = buffer[i];
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

    var updateSvgPath = function () {
      var pt = getAveragePoint(0);

      if (pt) {
        // Get the smoothed part of the path that will not change
        strPath += ' L' + pt.x + ' ' + pt.y;

        // Get the last part of the path (close to the current mouse position)
        // This part will change if the mouse moves again
        var tmpPath = '';
        for (var offset = 2; offset < buffer.length; offset += 2) {
          pt = getAveragePoint(offset);
          tmpPath += ' L' + pt?.x + ' ' + pt?.y;
        }

        // Set the complete current path coordinates
        path?.setAttribute('d', strPath + tmpPath);
      }
    };

    gsap.registerPlugin(MotionPathPlugin);
    window.addEventListener('mousedown', onMousedown);

    return () => {
      window.removeEventListener('mousedown', onMousedown);
    };
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
      </Head>
      <main className="max-w-screen-xl px-5 pt-2 m-auto mb-10 md:pt-10 lg:pt-[135px]">
        {/*<div className="mb-2 md:mb-6">
          <span
            role="img"
            aria-label="Hello"
            className="relative h-8 w-8 md:h-14 md:w-14 inline-block animate-wiggle origin-[70%] mr-4 rerun"
          >
            <Image
              src={WavingHandIcon}
              layout="fill"
              objectFit="cover"
              alt="Hello, I'm Mikkel Damm"
              priority={true}
            />
          </span>
        </div>
  */}
        <div className="relative">
          <div className="w-56 mb-14">
            <svg
              id="larsen"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 433.83 487.24"
              className="relative"
            >
              <path
                fill="#fee6da"
                d="M126.77 200.51c-18.52 1-36.11 6.25-54 11-4 .82-9.54-3.48-10-6-.68-3.75-2.9-8.22-3-12-.22-8.15.11-19.83 0-28-.15-11.29-1.68-19.69-1-31 .9-14.91.76-34.48 5-49 3.84-13.13 9.46-27.6 19-38 14.86-13.66 38-24.42 57-31 7.26-.89 17.83-6.64 25-8C227.23-3.31 277 16.5 323.55 61.18c24.32 23.32 37.92 52.22 45 84.64 2.44 11.22 4.36 22.54 5.94 33.91.27 2 14.5 18.94 13.31 20.78-12.32-.32-20.69.56-33 0-3.8-.17-14-3-19-2s-4.8 1.55-10 2c-16 1.41-25.38 3.37-39 12-3.06 2-11.44 7-15 7-13.5 0-24.5-1.09-38-1-4.3 0-12.36-.65-16-3-7.84-5-21.11-7.58-30-11m84.1 32.22q3.48 25.47 6.94 50.93c.89 6.6 1.56 13.23 2.66 19.79.47 2.84 3.81 8.09 1.27 8.06-11.32-.1-26.68 1.15-38 1-3 0-3.1 2.44-3 6 .09 3.17-.82-3.6 2.57-3.65 15-.19 23.45 2.48 38.43 2.65 3.3 0 4.62-3 4-6-.53-2.59.28-2.35 0-5-.41-1.1-6.16-16.3-5-17 1.53-.91 7.87 1.09 9 2 4.66 3.78 13.56 10.43 19 13 18.83 8.9 38 9.71 58 4 2.5-.71 14.28-7.26 17-6 2.12 2.58-2.51 18.33-3 21-4.43 24.1-15.89 46.55-27 68.46-.43.86-1.25 1.6-.91 2.73-8.74 16.07-19.76 30.3-33.92 42-16.48 10.66-35.29 13.55-54.18 15.6a190.23 190.23 0 0 1-71.76-5.72q-53.82-14.88-85.72-60.94c-4.55-6.58-14.4-13.26-18.51-20.13-8.61-14.39-14.53-27.62-16-44-1-10.92-.5-22 0-33 .83-10.47-.28-22.52 0-33 .06-2 1.19-22.32 4-24 1.76 7.11 8 30.85 10.16 37.52 5.06 15.71 13.23 24.63 27.84 33.48 30.27 18.34 64.3 14 85-8 11.63-12.32 19.26-21.73 23-38 1-4.17 2.63-18.7 3-23 .11-3.87 1.89-7.12 2-11 1.42-1.68 5.65.21 7.7.2 9.46-.06 18.92-.08 28.38 0 2.88.04 6.92 1.8 7.05 10.02Z"
              />
              <path
                fill="#fee6da"
                d="M206.77 293.51c-17 16.6-56.2 29.6-80 19-19.6-8.72-33.57-26.13-36-47-1.25-10.74-4.92-29.21-3-40 .76-4.26 2.93-14.71 6-18 18.07-7.18 41-8.24 60-7 9.3.61 20.06 1.17 29 4 7 2.23 20.45 4 26 9 11.21 10.21 16.55 20.15 15 34-1.36 12.15-9.41 36.36-17 46Zm178 10c-27.11 18.46-86.2 16.25-102-22-3.25-7.86-2.57-25.84-4-34a60.05 60.05 0 0 1-1-14c.4-6 4.63-13.37 8.93-17.85 9.33-7.23 20.49-9.16 31.71-10.63 17.75-2.34 41.83-6.21 59.36-2.52 4.6 1 13.81.6 17 5 .8 2.86-7.45 15.6-8.23 18.31-3.46 12-6 24.19-5.48 36.68a239.68 239.68 0 0 0 3.18 30.09c.51 2.92 2.28 8.41.53 10.92Z"
              />
              <path
                fill="#fee6db"
                d="m393.83 222.76 1-1c.25 6.21 3.69 11.54 4.46 17.77 1.18 9.58-.2 18.88-1 28.27-.69 8.16-2.51 16.09-7.34 23-3.79-21-4.89-41.91 1.81-62.62a41.58 41.58 0 0 0 1.07-5.42Z"
              />
              <path
                fill="#f7ceb9"
                d="M77.77 287.51a30.76 30.76 0 0 1 0-10c-.06-12.82-1.06-8.17-1-21 0 0 1.68-16.08 2-17 3 12 6.26 29.66 11.26 41.15 9.8 22.53 28.33 32.48 51.32 36.21a82.8 82.8 0 0 0 32.65-1.43c29.11-6.92 44.19-27.1 51.69-54.47 1.4-5.11 2.62-10.27 3.92-15.4-.26 10.95-3.41 21.33-7.15 31.43-4.6 12.44-11 24-22 32-18.64 13.44-39.45 17.51-62 13.28-14.2-2.66-27.2-7.64-37.31-18.53-8.39-9-13-20-16.26-31.65-1.74-6.2-3-12.52-5.14-18.78.02 11.88.02 22.19-1.98 34.19Zm298 31c-23.19 8.89-47 7.39-69.28-3.44A46.36 46.36 0 0 1 292.41 305c-2.08-2.26-3.44-.55-3.64 1.52-1.15-1.91-.76-5.93-1-8-.19-1.43-.63-1.69 1.88-2.46 17.13 17.83 38.57 23.14 62.4 21.34 8.18-.62 15.95-3.16 23.75-5.49 1.86 2 2.14 3.81 1 5.61-.25.13-.8.86-1.03.99Zm-105.97-82.6c-1.46-2-3.53-2-5.74-2-11.36.06-22.72 0-34.09.05-.95-4.43.11-6.44 5.35-6.16 8.93.49 17.9.14 26.85.14 7.52-.03 7.52-.03 7.63 7.97Z"
              />
              <path
                fill="#e5bca7"
                d="M78.37 291a315.77 315.77 0 0 0 5.37 53.94c2.27 12.31 8.8 23 15.1 33.52 13.16 22 30 40.64 52 54.17A153.9 153.9 0 0 0 210 454c11.53 1.67 23.11 3.07 34.71 2.7 23.36-.73 46.35-3.84 67.89-13.83a21.72 21.72 0 0 1 3.81-1 119.49 119.49 0 0 1-49.88 28.27c-46.39 13.21-92 11.49-135.47-10.79-30.5-15.62-51.17-41-66.19-71.26-10.94-22.06-18-45.42-22.73-69.53-.47-2.41-.64-3.94 2.47-3.56s3.14-1.57 2.83-3.74-2.46-1.7-6.67-1.81c-16.54-.41-24.34-12.6-30.29-27.42-6.11-15.23-4-29.75 6.58-42.64a33.87 33.87 0 0 1 17.42-11.11c1.36-.38 3.29-.29 2.93-2.51s1.48-5.42-1.31-6.62c-2-.87-1.85-2-1.85-3.39 0-28.64-.55-57.3 4.07-85.75 5-30.78 19.16-56.45 42.12-77.39a28 28 0 0 1 2.82-2c.18 2.41-1.6 4-2.66 5.76C69.2 75.77 63.74 96.65 63.27 119c-.14 6.44-.88 12.89-.81 19.36.22 20.73 1.64 41.4 3.06 62.07.15 2.23 4.37 5.19 7.25 6-5.11 1.54-6.66 3.89-6 9a41.7 41.7 0 0 1 0 5c1 4.84-3.81 2.21 1 4 3.57 1.34 7.37-.55 8 3 .27 1.51 2.43 3.66 3 5 .08 1-.44 13.46-.36 14.46a433.39 433.39 0 0 0-.04 44.11Z"
              />
              <path
                fill="#d3aa95"
                d="M78.77 239.51c0 1-.62 1.22-.9-.12-.75-3.7-3.15-6-6.56-7.41-6.82-2.84-7.77-4.86-7.54-12.47 1 1.9 2.21 4.9 4.57 5.48 7.25 1.78 9.93 7 10.71 13.82.15 1.31-.5-.59-.28.7Z"
              />
              <path
                fill="#fefefe"
                d="M197.81 295.49c2.58-7.16 6.95-13.51 9-21 2.5-9.09 3.79-18.26 2.6-27.56-2.14-16.78-13.42-25.38-28.5-29.61a146 146 0 0 0-79.54-.05c-1.28.35-2.52 1-3.64-.28 2.58-4.24 6.69-6.49 11.19-7.72 26.55-7.22 53.2-7.61 79.72-.09 16.74 4.74 31 14.34 29 40.84-1.25 17.46-6.91 33.08-19.83 45.47Zm188.96-75.98c-18.92-6.69-42.51-9.24-62.39-7.82a132 132 0 0 0-38.61 8.82c6.66-8.55 15.11-12.7 25-15 24.71-5.72 56.48-4 81 3m-1 88c-.9-.42-2-3.6-2-4.47 4.06-13.67 6.91-27.54 6.93-41.88 0-6.16 1.13-19.82-1-25.65-1-2.89-2.19 1.65-3-1.23-.3-5.81 1.84-11.39 6-12.77 6.58 5.23 14.27 19.2 11 26 .75 11.32-1.82 22.87-4 34a49.26 49.26 0 0 1-13.93 26ZM374 199.31c-1.67-9.45-3.25-31.92-5-41.34-4.52-23.82-10.82-47-24.44-67.54-25.37-38.19-60.65-62.34-105.18-72.77-18-4.23-36.35-5-54.91-3.46a248.15 248.15 0 0 0-43.15 7 3 3 0 0 1-3.24-.62c17-6.59 34.82-9.83 52.91-11.65 36-3.61 70.4 1.45 102.35 19.11q67.17 37.2 81.66 112.79 3.76 19.62 6.48 39.38c5.27 19.3 1 19.49-5.54 19.28-.64-.02-1.3-.12-1.94-.18Z"
              />
              <path
                fill="#e6bda8"
                d="M383 302.21c-.16-10.47-2.26-20.76-3.29-31.14-1.5-15.08 1.11-29.4 4.81-43.74.7-2.73 1.61-5.41 2.42-8.12l.1.1c4.44-.52 6.16 1.75 7.78 5.2-.27 7.35-2.48 14.83-3.71 22-1.93 11.26-1.11 22.49.32 33.69.46 3.62.22 7.28 1 10.86.09 1.12-.32 2.2-.31 3.32a30.38 30.38 0 0 1-9.12 7.83Z"
              />
              <path
                fill="#f4ccb7"
                d="M386.77 219.51c1-3.27 2.17-6.76 3.14-10a18.44 18.44 0 0 1 9.15 4.69c-3.06 2.27-3.05 7.26-4.29 10.35"
              />
              <path
                fill="#fdfdfc"
                d="M352.51 399.45c-1-4 1.87-6.79 3.19-9.94a294.12 294.12 0 0 0 18.95-65.15c.27-1.63.63-3.25 1-4.87l.17-1c1.44-2.22 4.21-4.81 7-3-5.43 28.85-15.38 58.51-30.31 83.96Z"
              />
              <path
                fill="#f9ddce"
                d="M382.77 316.51c-2 .66-5 1.35-7 2 .34-2 .47-3 .81-5l5.66-2.85c.76 2.59 1.1 3.71.53 5.85Z"
              />
              <path d="M390.42 194.93c.45 3.25 2.19 4.12 5.21 4.7 10.45 2 20.83 4.41 31.22 6.77 4 .91 7.25 2.74 7 7.66-.31 5.12 1.39 11.09-5.88 13.16-4.8 1.37-7.44 4.72-8.34 9.61q-1.79 9.57-3.78 19.1c-3.25 15.42-7.25 30.67-18.11 42.71a27.79 27.79 0 0 0-7.05 14.78c-5.28 30.52-14 60-28.88 87.31-17.94 32.89-42.81 58.51-77.75 73.27-28.91 12.22-59.19 15-90.17 12.27-50.19-4.37-90.66-26.1-119.83-67.6-21-29.85-32.37-63.61-39.2-99.09-.76-3.9-2.17-6.1-6.08-7.85-17.94-8-27.33-22.64-28.63-41.84-1.3-19 6-34.59 22.48-44.92 3.37-2.1 4.16-4.26 4.28-7.91.79-26.13.7-52.35 3.05-78.34C34.42 89.41 59.7 52.6 101.91 27.47 137 6.57 175.65-1 216 .11c54.9 1.56 99.45 24.49 133.88 67.16 18.41 22.82 27.09 49.77 32.73 78 2 10 2 10 12.5 10.82.79.06 1.58.24 2.37.36V168h-11.14c1.41 9.26 2.85 18.08 4.08 26.93ZM377.6 167.3l-47.43-1.62v-10.94h45.27c-5.37-33.34-15.52-64.58-39-90.14-36.62-39.93-82-58.38-136.1-55.82-32.74 1.55-64 8.53-92.53 25.23-42.07 24.65-66 61.23-69.78 110-1.81 23.55-1.71 47.26-2.28 70.9 0 1.48 1.88 2.91 2.25 4.51a73.87 73.87 0 0 1 1.07 8.21c-17.14 4.48-27 15.31-29.75 32-4.42 27.24 16.13 47.15 35.4 46.88 4.22-.05 4.34.52 3.93 8.32l-6 1.11c2.73 10.88 5.09 21.72 8.18 32.35 8.28 28.42 20.53 54.87 39.89 77.62 26.17 30.75 59.92 47 99.65 51.22 27.09 2.91 53.94 1.52 80-7.32 37.54-12.74 64.41-38 83.31-72.21 14.29-25.92 22.69-53.88 28-82.86a17.58 17.58 0 0 0 0-3.1c-34 13.93-65.41 11.85-93.63-13.94.89 7.79 1.74 15.31 2.61 22.92 6.66 2.63 14.71 4.89 21.78 8.89a57.61 57.61 0 0 1 15.25 13.17c3.94 4.71 2.64 7.48-3.44 8.69a188.93 188.93 0 0 1-24.68 3.5c-33.14 2.08-66.27 2.38-99.31-1.65a61.14 61.14 0 0 1-9.77-2c-5.15-1.5-6-3.64-2.63-7.9a39.88 39.88 0 0 1 8.73-8.07c10.91-7.43 23.29-11.28 36.08-14 1.78-.37 3.54-.78 5.33-1.18.23-2.6.44-4.9.69-7.68h41.21c-3.61-27.7-7.16-54.81-10.71-82h-39.43c0 2.45.06 4.86 0 7.27-.49 18.72-5.44 36.26-15.47 52-15.88 24.92-40.3 31.62-68 30.07-5.26-.3-10.52-1.66-15.68-2.93-27.3-6.72-40.49-26.24-46.58-52-2.08-8.74-3.79-17.57-5.5-26.4-1.1-5.68-3.73-9.66-9.61-11.52-6.82-2.16-4.71-8.28-5-13.18-.25-4 2.19-5.9 5.83-6.91 37.25-10.34 75-13.36 113.28-7.52 11.94 1.83 23 6.46 33.56 12.34a29.05 29.05 0 0 0 12.63 3.39c13.15.43 26.34.41 39.49 0a27 27 0 0 0 12.22-3.28 103.09 103.09 0 0 1 48.38-14.31c17.26-.62 34.57-.13 52.48-.13-1.36-9.75-2.74-19.58-4.19-29.98Zm-263.47 40.79c-15.1 3.19-21.38 10.18-21.95 25.43-.45 11.9-.05 24.13 2.22 35.77 4.86 24.93 26.89 42.32 53.41 42.78a93.17 93.17 0 0 0 27.07-3.37c29.09-8.41 41-32.62 43-58.14a53.5 53.5 0 0 0-.39-13c-2.08-12.34-9.49-20.57-20.84-25.49-23.88-10.56-63.88-8.56-82.52-3.98Zm186.18 4.35c-10.8 4.75-18 12.77-19.71 24.53-.72 4.93.45 10.23 1.25 15.29 1.28 8.17 1.61 16.84 4.71 24.32 10 24.12 30.17 34 54.93 35.58 17.93 1.12 34.29-3.57 47.55-16.54a48 48 0 0 0 13-21 108.63 108.63 0 0 0 2.85-46.44c-1.33-9.08-6.55-15.41-15.48-18.47-13.58-4.65-27.6-5.76-41.8-5.67-16.29-.04-32.23 1.78-47.3 8.4Z" />
              <path d="M208.47 167.6v-11.12h-80.39v11.12Zm-188 82.59C13.53 265 17.23 279.64 30 288l4.83-6.93c-10.26-7.3-10.49-16.91-6.62-27.75ZM164.15 253c-.18-3.66-.33-6.9-.49-10.09-7.37-.89-13.17 3.72-13.69 10.57a12.17 12.17 0 0 0 10.9 12.65c6.84.63 12.25-4.59 12.67-12.63Zm176 0c-.18-3.67-.33-6.91-.49-10.1-7.4-.86-13.18 3.74-13.69 10.59a12.16 12.16 0 0 0 10.92 12.64c6.83.62 12.25-4.61 12.65-12.62Z" />
              <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="6"
                d="M280.06 375.51s-9 6-17 8-17-1-17-1"
              />
              <path
                fillRule="evenodd"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M214.35 429.35a71.31 71.31 0 0 0 8.88 2.85 59.22 59.22 0 0 0 7.54 1.31l16.06-12.85h22.61l10.33 14.85c23.84-3.37 32-11 42.82-22 5.5-5.61 8.18-12 14.18-19l33-27c1.5 1.5-8 8-3 3-7 23-36.44 59.4-50 74s-34 29-78 34c-36.28 4.13-90.16-.34-147-47.17-26-40.83-36.1-45.83-47-118.83h9c1.64 8.53 9.33 41 35.5 62.45 34.91 28.66 76.4 21.68 82.5 20.55 20 19.54 36.84 31.55 42.58 33.84Z"
              />
            </svg>
            <svg
              ref={ref}
              className="fixed inset-0 z-10 w-screen h-screen pointer-events-none"
            ></svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary lg:w-4/5 md:text-7xl">
          Freelance developer, entrepreneur and creative guy from Denmark
          <span className="text-action">.</span>
        </h1>
        <p className="block mt-6 mb-10 text-lg tracking-tight text-secondary lg:w-2/3">
          For more than 10 years, I have been working as a frontend developer at large companies to
          early startups. Below are some of the work I&apos;ve involved with and in.
        </p>
        <div className="grid gap-2 md:grid-cols-3 md:grid-flow-row-dense">
          <Link href="/works/emanager">
            <a className="relative flex flex-col justify-between bg-[#f1f4f6] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                eManager
              </h3>
              <p className="mt-1 text-gray-600">Founder & CEO</p>
            </a>
          </Link>
          <Link href="/works/ownrs">
            <a className="relative flex flex-col justify-between bg-[#c6f5dd] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                ownrs
              </h3>
              <p className="mt-1 text-gray-600">Freelance developer</p>
            </a>
          </Link>
          <Link href="/works/hoestt">
            <a className="relative flex flex-col justify-between bg-[#fffbd5] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                hoestt
              </h3>
              <p className="mt-1 text-gray-600">Mobile app</p>
            </a>
          </Link>
        </div>
      </main>
    </MainLayout>
  );
}
