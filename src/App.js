import React from 'react';
import './App.css';
import Login from './page/Login';
import HiddenMessage from './page/HideMessage';

function App() {
  return (
    <div className="App">
      <HiddenMessage>
        123
      </HiddenMessage>
    </div>
  );
}

export default App;
