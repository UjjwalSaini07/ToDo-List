import React from 'react';
import { motion } from 'framer-motion';
import logoImage from './assets/Logo1.png';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#1E40AF', padding: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.07rem' }}>
          <img src={logoImage} alt="Logo" style={{ width: '28px', marginRight: '0.5rem' }} />
            My Todo App
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <motion.a 
            href="/" 
            style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.3s' }}
            whileHover={{ scale: 1.1, color: '#A5B4FC' }}
          >
            Home
          </motion.a>
          <motion.a 
            href="/remainder" 
            style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.3s' }}
            whileHover={{ scale: 1.1, color: '#A5B4FC' }}
          >
            Remainder
          </motion.a>
          <motion.a 
            href="/about" 
            style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.3s' }}
            whileHover={{ scale: 1.1, color: '#A5B4FC' }}
          >
            About
          </motion.a>
          <motion.a 
            href="/contact" 
            style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.3s' }}
            whileHover={{ scale: 1.1, color: '#A5B4FC' }}
          >
            Contact
          </motion.a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
