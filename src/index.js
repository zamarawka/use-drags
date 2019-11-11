import { useEffect, useRef, useCallback } from 'react';

const POINTER_START_EVENTS = ['mousedown', 'touchstart'];
const POINTER_MOVE_EVENTS = ['mousemove', 'touchmove'];
const POINTER_END_EVENTS = ['mouseup', 'touchend'];

const MOUSE_LEFT_KEY = 1;

function eventsEqualizer(e) {
  if (e instanceof TouchEvent) {
    if (e.touches.length > 0) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    } else if (e.changedTouches.length > 0) {
      e.clientX = e.changedTouches[0].clientX;
      e.clientY = e.changedTouches[0].clientY;
    }
  } else {
    if (e.type !== 'mousedown') {
      e.preventDefault();
    }
  }
}

const stopEvent = e => e.stopPropagation();

const on = (element, event, handler) => {
  if (Array.isArray(event)) {
    event.forEach(e => {
      on(element, e, handler);
    });
  }

  if (element && event && handler) {
    element.addEventListener(event, handler);
  }
}

const off = (element, event, handler) => {
  if (Array.isArray(event)) {
    event.forEach(e => {
      off(element, e, handler);
    });
  }

  if (element && event) {
    element.removeEventListener(event, handler);
  }
};

function useDragged(el, onDrag) {
  const lastCoords = useRef(null);
  const firstCoords = useRef(null);
  const cb = useCallback(onDrag, []);

  useEffect(() => {
    if (el === null) {
      return;
    }

    el.style.touchAction = 'none';

    function onPointerMove(e) {
      eventsEqualizer(e);

      if (lastCoords.current) {
        const { clientX, clientY } = e;
        const deltaX = clientX - lastCoords.current.x;
        const deltaY = clientY - lastCoords.current.y;
        const offsetX = clientX - firstCoords.current.x;
        const offsetY = clientY - firstCoords.current.y;

        cb({
          el,
          deltaX,
          deltaY,
          offsetX,
          offsetY,
          clientX,
          clientY,
        });

        lastCoords.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    }

    function onPointerEnd(e) {
      eventsEqualizer(e);

      lastCoords.current = null;

      cb({
        el,
        last: true,
        clientX: e.clientX,
        clientY: e.clientY,
      });

      off(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      off(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);
    }

    function onPointerStart(e) {
      if (e instanceof MouseEvent && e.which !== MOUSE_LEFT_KEY) {
        return;
      }

      stopEvent(e);

      eventsEqualizer(e);

      firstCoords.current = {
        x: e.clientX,
        y: e.clientY,
      };

      lastCoords.current = firstCoords.current;

      cb({
        el,
        first: true,
        clientX: e.clientX,
        clientY: e.clientY,
      });

      on(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      on(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);
    }

    on(el, POINTER_START_EVENTS, onPointerStart);

    return () => {
      off(el, POINTER_START_EVENTS, onPointerStart);
      off(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
      off(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);

      el.style.touchAction = null;
    };
  }, [el, cb]);
}

export default useDragged;
