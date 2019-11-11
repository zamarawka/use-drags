import React, { useRef } from "react";
import useDrags from '../../src';

export const CustomDiv = ({ onDrag }) => {
  const ref = useRef(null);
  useDrags(ref.current, onDrag);

  return (
    <div ref={ref} />
  );
};

export const getEvent = (type, gesture, opts = {}) => {
  const eventsMap = {
    start: {
      mouse: 'mousedown',
      touch: 'touchstart'
    },
    move: {
      mouse: 'mousemove',
      touch: 'touchmove'
    },
    end: {
      mouse: 'mouseup',
      touch: 'touchend'
    }
  };

  switch (gesture) {
    case 'mouse':
      return new MouseEvent(eventsMap[type][gesture], {
        bubbles: true,
        which: 1,
        ...opts
      });

    case 'touch':
      const { clientX = 0, clientY = 0, ...othersOpts } = opts;

      return new TouchEvent(eventsMap[type][gesture], {
        bubbles: true,
        [type !== 'move' ? 'touches' : 'changedTouches']: [{
          clientX,
          clientY,
        }],
        ...othersOpts
      });

    default:
      throw new Error('Unhandled event type');
  }
}
