import React from 'react';
import Home from './pages/home';
import Remainder from './pages/remainder';
import ThemeToggle from './pages/ThemeToggle';
import './App.css';

function App() {
  return (
    <main>
      <ThemeToggle />
      <Home />
      <Remainder />
    </main>
  );
}

export default App;
