import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Remainder from './pages/remainder';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ThemeToggle />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/remainder" element={<Remainder />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

// Please Avoid to do chnage sin App.js