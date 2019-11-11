import React from "react";
import { render, cleanup, act, fireEvent, waitForDomChange } from '@testing-library/react';

import { CustomDiv, getEvent } from './helpers/wrappers';

afterEach(cleanup);

const lifecycleTests = (gesture) => {
  it('should not handle gesture move\'s or end around', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    act(() => {
      fireEvent(div, getEvent('move', gesture));
    });

    expect(onDrag).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent(div, getEvent('end', gesture));
    });

    expect(onDrag).toHaveBeenCalledTimes(0);
  });

  it('should handle gesture start event', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    act(() => {
      fireEvent(div, getEvent('start', gesture));
    });

    expect(onDrag).toHaveBeenCalledTimes(1);
    expect(onDrag.mock.calls[0][0]).toMatchObject({
      first: true,
      clientX: 0,
      clientY: 0
    });
  });

  it('should handle gesture move event', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    act(() => {
      fireEvent(div, getEvent('start', gesture, { clientX: 5, clientY: 5 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent(container, getEvent('move', gesture, { clientX: 10, clientY: 20 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(2);
    expect(onDrag.mock.calls[1][0]).toMatchObject({
      deltaX: 5,
      deltaY: 15,
      offsetX: 5,
      offsetY: 15,
      clientX: 10,
      clientY: 20
    });

    act(() => {
      fireEvent(container, getEvent('move', gesture, { clientX: 25, clientY: 45 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(3);
    expect(onDrag.mock.calls[2][0]).toMatchObject({
      deltaX: 15,
      deltaY: 25,
      offsetX: 20,
      offsetY: 40,
      clientX: 25,
      clientY: 45
    });
  });

  it('should handle gesture end event', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    act(() => {
      fireEvent(div, getEvent('start', gesture, { clientX: 5, clientY: 5 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent(container, getEvent('end', gesture, { clientX: 10, clientY: 20 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(2);
    expect(onDrag.mock.calls[1][0]).toMatchObject({
      last: true,
      clientX: 10,
      clientY: 20
    });
  });
};

describe('Mouse events', () => {
  it('should not handle mouse start event wich started not with left key', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    act(() => {
      fireEvent(div, new MouseEvent('mousedown', { which: 2 }));
    });

    expect(onDrag).toHaveBeenCalledTimes(0);
  });

  lifecycleTests('mouse');
});

describe('Touch events', () => {
  it('should set touch actions on draggable element to none', () => {
    const onDrag = jest.fn();
    const { container, rerender } = render(<CustomDiv onDrag={onDrag} />);
    const div = container.firstChild;

    rerender(<CustomDiv />);

    expect(div.style).toHaveProperty('touchAction', 'none');
  })

  lifecycleTests('touch');
});
