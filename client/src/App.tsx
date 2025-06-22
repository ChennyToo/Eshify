import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>EshiGuessr</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add other routes here later, e.g., for the game screen */}
        </Routes>
      </header>
    </div>
  );
}

export default App;
