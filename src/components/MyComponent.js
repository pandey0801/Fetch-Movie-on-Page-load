import React, { useState, useCallback } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // Define a callback function that increments count
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // No dependencies, so the function won't change

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default MyComponent;
