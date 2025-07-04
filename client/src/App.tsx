import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuessPage from './pages/GuessPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GuessPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
