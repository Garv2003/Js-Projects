import { useState } from "react";
import useTimeOut from "./useTimeOut";

export default function TimeContainer() {
  const [count, setCount] = useState(10);
  const { clear, reset } = useTimeOut(() => setCount(0), 1000);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={clear}>Clear Timeout</button>
      <button onClick={reset}>Reset Timeout</button>
    </div>
  );
}
