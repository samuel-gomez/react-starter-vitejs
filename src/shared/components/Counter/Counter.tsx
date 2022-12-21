import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((prevcount) => prevcount + 1)}>
      count is { count }
    </button>
  );
}

export default Counter;
