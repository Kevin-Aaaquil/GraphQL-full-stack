import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0)
  return (
    <div className="App">
      <div>{counter}</div>
      <div><button onClick= {()=>{
        setCounter(counter+1);
      }}>Click to Increase Counter</button></div>
    </div>
  );
}

export default App;
