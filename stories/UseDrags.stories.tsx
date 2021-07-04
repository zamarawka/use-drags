import { useRef, useState } from 'react';

import useDrags from '../src';

export default {
  title: 'UseDrags',
  argTypes: { onDrag: { action: 'dragged' } },
};

export const Base: React.FC<{ onDrag: (ev: any) => void }> = ({ onDrag }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useDrags(elRef, (ev) => {
    setCoords(({ x, y }) => ({ x: x + ev.deltaX, y: y + ev.deltaY }));

    if (ev.first) {
      setIsDragging(true);
    }

    if (ev.last) {
      setIsDragging(false);
    }

    onDrag && onDrag(ev);
  });

  return (
    <div style={{ width: '300px', height: '300px', border: '1px solid black' }}>
      <div
        ref={elRef}
        style={{
          width: '20px',
          height: '20px',
          border: isDragging ? '10px solid pink' : '2px solid green',
          background: isDragging ? 'blue' : 'yellow',
          transition: 'border .3s, background .3s',
          cursor: isDragging ? 'grabbing' : 'pointer',
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        }}
      />
    </div>
  );
};
