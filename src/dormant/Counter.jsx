import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  //takes an initial value of 0
  //returns an array with two elements
  //first element is the state value
  //second element is a function to update the state value


  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2">
      <p className="text-xl font-semibold">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}; 

export default Counter;