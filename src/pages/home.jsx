import React, { useState } from 'react';

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
        {tasks.map((task, index) => (
          <li key={index} style={styles.listItem}>
            <span>{task}</span>
            <button onClick={() => removeTask(index)} style={styles.removeButton}>X</button>
          </li>
        ))}
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
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 20px 0',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 10px',
  },
};

export default Home;
