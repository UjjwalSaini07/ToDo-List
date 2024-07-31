import React from 'react';
import Navbar from './components/Navbar'; // Adjust the path as needed
import Home from './pages/home';
import Remainder from './pages/remainder';
import ThemeToggle from './pages/ThemeToggle';
import './App.css';

function App() {
  return (
    <main>
      <Navbar />
      <ThemeToggle />
      <Home />
      <Remainder />
    </main>
  );
}

export default App;
