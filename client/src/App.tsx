import React, { useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0)
  return (
    <div className="App">
      <h1>React</h1>
      <div>Counter : {counter}</div>
      <br />
      <div><button className="button" onClick={()=>{
        setCounter(counter+1)
      }}>Click to increase counter</button></div>
    </div>
  );
}

export default App;
