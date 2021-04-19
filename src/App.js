import React, { useEffect, useState } from 'react';
// import queryString from 'query-string'; // npm i --save query-string
import './App.scss';
import Hero from './components/Hero';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick = {() => setCount( count + 1 ) }>Increase</button>
      <Hero name="Easy team" />
    </div>
  );
}

export default App;
