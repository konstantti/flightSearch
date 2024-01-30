// App.js

import React from 'react';
import './App.css';
import Flights from './components/Flights';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Flight Search App</h1>
      </header>
      <main>
        <Flights />
        {/* Muut komponentit tai sisältö tässä */}
      </main>
      <footer>
        {/* Sivun alaosan sisältö */}
      </footer>
    </div>
  );
}

export default App;
