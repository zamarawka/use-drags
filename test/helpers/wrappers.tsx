import { useRef } from 'react';
import useDrags from '../../src';

export const CustomDiv = ({ onDrag }: { onDrag: (...args: any[]) => any }) => {
  const ref = useRef(null);
  useDrags(ref, onDrag);

  return <div ref={ref} />;
};

const eventsMap = {
  start: {
    mouse: 'mousedown',
    touch: 'touchstart',
  },
  move: {
    mouse: 'mousemove',
    touch: 'touchmove',
  },
  end: {
    mouse: 'mouseup',
    touch: 'touchend',
  },
};

export const getEvent = (
  type: keyof typeof eventsMap,
  gesture: keyof typeof eventsMap.start,
  opts: { clientX?: number; clientY?: number } = {},
) => {
  switch (gesture) {
    case 'mouse':
      return new MouseEvent(eventsMap[type][gesture], {
        bubbles: true,
        button: 0,
        ...opts,
      });

    case 'touch':
      const { clientX = 0, clientY = 0, ...othersOpts } = opts;

      return new TouchEvent(eventsMap[type][gesture], {
        bubbles: true,
        [type !== 'move' ? 'touches' : 'changedTouches']: [
          {
            clientX,
            clientY,
          },
        ],
        ...othersOpts,
      });

    default:
      throw new Error('Unhandled event type');
  }
};
