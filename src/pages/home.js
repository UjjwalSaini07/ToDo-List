import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown, FaEdit, FaCheck } from 'react-icons/fa';

const Home = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f9f9f9';
  }, [theme]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  const editTask = (index) => {
    setIsEditing(index);
    setEditValue(tasks[index].text);
  };

  const saveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editValue;
    setTasks(newTasks);
    setIsEditing(null);
  };

  const markTaskComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const moveTaskUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  };

  return (
    <div style={styles.container(theme)}>
      <h1 style={styles.title(theme)}>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={styles.input(theme)}
          placeholder="Add a new task"
        />
        <button onClick={addTask} style={styles.addButton(theme)}>
          <FaPlus style={styles.addIcon} />
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.length === 0 ? (
          <li style={styles.emptyList(theme)}>No tasks yet!</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} style={styles.listItem(theme, task.completed)}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={styles.input(theme)}
                  />
                  <button onClick={() => saveTask(index)} style={styles.saveButton(theme)}>
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  <span style={styles.taskText(theme, task.completed)}>{task.text}</span>
                  <div style={styles.buttonGroup}>
                    <button onClick={() => markTaskComplete(index)} style={styles.completeButton(theme)}>
                      <FaCheck />
                    </button>
                    <button onClick={() => editTask(index)} style={styles.editButton(theme)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => moveTaskUp(index)} style={styles.moveButton(theme)}>
                      <FaArrowUp />
                    </button>
                    <button onClick={() => moveTaskDown(index)} style={styles.moveButton(theme)}>
                      <FaArrowDown />
                    </button>
                    <button onClick={() => removeTask(index)} style={styles.removeButton(theme)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Helvetica Neue", sans-serif',
    padding: '30px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    color: theme === 'dark' ? '#e0e0e0' : '#333333',
    transition: 'all 0.3s ease',
  }),
  title: (theme) => ({
    margin: '0 0 20px 0',
    fontSize: '32px',
    fontWeight: '700',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    letterSpacing: '1.5px',
  }),
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  input: (theme) => ({
    flex: 1,
    padding: '12px',
    border: '2px solid',
    borderColor: theme === 'dark' ? '#555555' : '#dddddd',
    borderRadius: '8px',
    marginRight: '10px',
    fontSize: '16px',
    backgroundColor: theme === 'dark' ? '#2e2e2e' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: theme === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.4)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
  }),
  addButton: (theme) => ({
    padding: '12px 16px',
    background: theme === 'dark' ? 'linear-gradient(45deg, #007bff, #0056b3)' : 'linear-gradient(45deg, #00c6ff, #0072ff)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s, transform 0.2s',
    boxShadow: theme === 'dark' ? '0 6px 15px rgba(0, 123, 255, 0.4)' : '0 6px 15px rgba(0, 114, 255, 0.3)',
  }),
  addIcon: {
    fontSize: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
  },
  listItem: (theme, completed) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#6c757d' : 'inherit',
    transition: 'box-shadow 0.3s, transform 0.2s',
  }),
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  taskText: (theme, completed) => ({
    flex: 1,
    marginRight: '10px',
    textDecoration: completed ? 'line-through' : 'none',
  }),
  completeButton: (theme) => ({
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#28a745' : '#28a745',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.3s, transform 0.2s',
  }),
  editButton: (theme) => ({
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#007bff' : '#007bff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.3s, transform 0.2s',
  }),
  moveButton: (theme) => ({
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#ffc107' : '#ffc107',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.3s, transform 0.2s',
  }),
  removeButton: (theme) => ({
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#dc3545' : '#dc3545',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'color 0.3s, transform 0.2s',
  }),
  saveButton: (theme) => ({
    padding: '8px',
    background: theme === 'dark' ? '#28a745' : '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s, transform 0.2s',
    boxShadow: theme === 'dark' ? '0 4px 12px rgba(40, 167, 69, 0.5)' : '0 4px 12px rgba(40, 167, 69, 0.4)',
  }),
  emptyList: (theme) => ({
    padding: '12px',
    color: theme === 'dark' ? '#aaaaaa' : '#555555',
    textAlign: 'center',
  }),
};

export default Home;
