import React from 'react';
import ButtonsGroup from "./ButtonsGroup";

function App() {
  return (
    <div className="App">
      <h1>Choose Your Game</h1>
      <ButtonsGroup names={['Chess', 'Poker', 'Black Jack', 'Go']}/>
    </div>
  );
}

export default App;
