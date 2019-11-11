[![Ci Status](https://github.com/zamarawka/use-drags/workflows/CI/badge.svg)](https://github.com/zamarawka/use-drags/actions)
[![Npm version](https://img.shields.io/npm/v/use-drags.svg?style=flat&logo=npm)](https://www.npmjs.com/package/use-drags)
[![React version](https://img.shields.io/npm/dependency-version/use-drags/peer/react.svg?style=flat&logo=react)](https://reactjs.org/)

# use-drags
Handle drag events without overhead by only 1 callback. "React hook" for manage drag and drop lifecycle without extra business or view logic.
Useful as base for custom UI components with draggable elements.

# Install

``` sh
npm install use-drags
```

# Usage

``` jsx
import React, { useRef, useState } = 'react';
import useDrags from 'use-drags';

function DraggableBlock() {
  const ref = useRef(null);
  const [position, setPosition] = useState(null);

  useDrags(ref, ({
    el,
    first,
    last,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    clientX,
    clientY,
  }) => {
    if (first) {
      el.style.opacity = 0.5;
    }

    if (last) {
      el.style.opacity = null;
      el.style.transform = null;
      setPosition(null);

      return;
    }

    setPosition({ clientX, clientY });

    el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  });

  return (
    <div ref={ref}>
      <span>Drag me!</span>
      {position !== null &&
        <span>X: {position.clientX }, Y: {position.clientY}</span>
      }
    </div>
  );
}
```

# Development

``` sh
npm run lint # linting
npm run test # testing
```

Active maintenance with care and ❤️.

Feel free to send a PR.
