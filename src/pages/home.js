import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Add a new task"
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.list}>
        {tasks.length === 0 ? (
          <li style={styles.emptyList}>No tasks yet!</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} style={styles.listItem}>
              <span>{task}</span>
              <button onClick={() => removeTask(index)} style={styles.removeButton}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '15px',
    width: '350px',
    margin: '50px auto',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  title: {
    margin: '0 0 20px 0',
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    marginRight: '10px',
    fontSize: '16px',
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  emptyList: {
    textAlign: 'center',
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '6px 12px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
};

export default Home;
