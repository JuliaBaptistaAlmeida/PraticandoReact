import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  let count2 = 0;

  return (
    <div>
    
      <button onClick={() => setCount(count + 1)}> {count}</button>

      <button onClick={() => count2 = count2 + 1}>{count2}</button>
    </div>
  );
}
