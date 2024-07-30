import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import './App.css';

function App() {
   const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleToggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <button
          className="mode-toggle-button"
          onClick={handleToggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
