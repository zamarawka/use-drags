import { useEffect, useRef, RefObject, useCallback } from 'react';

const POINTER_START_EVENTS = ['mousedown', 'touchstart'];
const POINTER_MOVE_EVENTS = ['mousemove', 'touchmove'];
const POINTER_END_EVENTS = ['mouseup', 'touchend'];

const MOUSE_LEFT_KEY = 0;
const { TouchEvent } = window;

function getClientCoords(e: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
  if (TouchEvent && e instanceof TouchEvent) {
    if (e.touches.length > 0) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    } else if (e.changedTouches.length > 0) {
      return {
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY,
      };
    }
  } else if (e instanceof MouseEvent) {
    if (e.type !== 'mousedown') {
      e.preventDefault();
    }

    return { clientX: e.clientX, clientY: e.clientY };
  }
}

function on(element: HTMLElement, events: string[], handler: any) {
  events.forEach((event) => {
    element.addEventListener(event, handler);
  });
}

function off(element: HTMLElement, events: string[], handler: any) {
  events.forEach((event) => {
    element.removeEventListener(event, handler);
  });
}

type onDragCb<T> = (e: {
  el: T;
  last: boolean;
  first: boolean;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  clientX: number;
  clientY: number;
}) => void;

const defaultRefFunction = () => {
  throw new Error('Cannot call an event handler while rendering.');
};

export function useEventCallback<T extends (...args: any[]) => any>(
  fn: T,
  dependencies: Array<any> = [],
): T {
  const ref = useRef<T | any>(defaultRefFunction);

  useEffect(() => {
    ref.current = fn;
    // React's array spread caution =\
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn].concat(dependencies));

  return useCallback<any>(
    (...args: any[]) => {
      const fn = ref.current;

      return fn(...args);
    },
    [ref],
  );
}

export const useDragsEvent = Symbol('useDragsEvent');

function oldIosFix(e: MouseEvent | TouchEvent) {
  if ((e as any)[useDragsEvent]) {
    e.preventDefault();
  }
}

let isPatchedIos = false;
const ua = window.navigator.userAgent;
const isSafari = ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1;
const safariVersion = ua.match(/Version\/(.*?) /);
const isOldSafari = isSafari && safariVersion && parseInt(safariVersion[1], 10) < 13;

function patchIos() {
  if (isOldSafari) {
    document.addEventListener('touchmove', oldIosFix, { passive: false });
  }

  isPatchedIos = true;
}

export default function useDragged<T extends HTMLElement>(
  elRef: RefObject<T>,
  onDrag: onDragCb<T>,
) {
  const lastCoords = useRef(null);
  const firstCoords = useRef(null);
  const cb = useEventCallback(onDrag);

  useEffect(() => {
    const el = elRef.current;

    if (!el) {
      return;
    }

    el.style.touchAction = 'none';

    function onPointerMove(e: MouseEvent | TouchEvent) {
      (e as any)[useDragsEvent] = true;

      if (lastCoords.current) {
        const { clientX, clientY } = getClientCoords(e);
        const deltaX = clientX - lastCoords.current.x;
        const deltaY = clientY - lastCoords.current.y;
        const offsetX = clientX - firstCoords.current.x;
        const offsetY = clientY - firstCoords.current.y;

        cb({
          el,
          first: false,
          last: false,
          deltaX,
          deltaY,
          offsetX,
          offsetY,
          clientX,
          clientY,
        });

        lastCoords.current = {
          x: clientX,
          y: clientY,
        };
      }
    }

    function onPointerEnd(e: MouseEvent | TouchEvent) {
      const { clientX, clientY } = getClientCoords(e);
      const deltaX = clientX - lastCoords.current.x;
      const deltaY = clientY - lastCoords.current.y;
      const offsetX = clientX - firstCoords.current.x;
      const offsetY = clientY - firstCoords.current.y;

      firstCoords.current = null;
      lastCoords.current = null;

      cb({
        el,
        first: false,
        last: true,
        deltaX,
        deltaY,
        offsetX,
        offsetY,
        clientX,
        clientY,
      });

      off(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      off(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);
    }

    function onPointerStart(e: MouseEvent | TouchEvent) {
      if (e instanceof MouseEvent && e.button !== MOUSE_LEFT_KEY) {
        return;
      }

      e.stopPropagation();

      const { clientX, clientY } = getClientCoords(e);

      firstCoords.current = {
        x: clientX,
        y: clientY,
      };

      lastCoords.current = firstCoords.current;

      cb({
        el,
        first: true,
        last: false,
        deltaX: 0,
        deltaY: 0,
        offsetX: 0,
        offsetY: 0,
        clientX,
        clientY,
      });

      on(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      on(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);
    }

    on(el, POINTER_START_EVENTS, onPointerStart);

    if (!isPatchedIos) {
      patchIos();
    }

    return () => {
      off(el, POINTER_START_EVENTS, onPointerStart);
      off(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      off(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);

      el.style.touchAction = null;
    };
  }, [elRef, cb]);
}
