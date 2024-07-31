import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown, FaEdit, FaCheck, FaStar } from 'react-icons/fa';

const Home = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f9f9f9';
  }, [theme]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false, priority: 'normal' }]);
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

  const togglePriority = (index) => {
    const newTasks = [...tasks];
    newTasks[index].priority = newTasks[index].priority === 'high' ? 'normal' : 'high';
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => 
    priorityFilter === 'all' ? true : task.priority === priorityFilter
  );

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
      <div style={styles.filterContainer}>
        <button onClick={() => setPriorityFilter('all')} style={styles.filterButton(theme, priorityFilter === 'all')}>All</button>
        <button onClick={() => setPriorityFilter('high')} style={styles.filterButton(theme, priorityFilter === 'high')}>High Priority</button>
        <button onClick={() => setPriorityFilter('normal')} style={styles.filterButton(theme, priorityFilter === 'normal')}>Normal Priority</button>
      </div>
      <ul style={styles.list}>
        {filteredTasks.length === 0 ? (
          <li style={styles.emptyList(theme)}>No tasks yet!</li>
        ) : (
          filteredTasks.map((task, index) => (
            <li key={index} style={styles.listItem(theme, task.completed, task.priority)}>
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
                    <button onClick={() => togglePriority(index)} style={styles.priorityButton(theme, task.priority)}>
                      <FaStar />
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
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterButton: (theme, active) => ({
    padding: '8px 12px',
    background: active ? (theme === 'dark' ? '#007bff' : '#0072ff') : 'transparent',
    color: active ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#0072ff'),
    border: '2px solid',
    borderColor: theme === 'dark' ? '#007bff' : '#0072ff',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '14px',
    transition: 'background 0.3s, color 0.3s',
  }),
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
  },
  listItem: (theme, completed, priority) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: `1px solid ${theme === 'dark' ? '#333333' : '#dddddd'}`,
    backgroundColor: completed ? (theme === 'dark' ? '#333333' : '#f1f1f1') : 'transparent',
    color: completed ? (theme === 'dark' ? '#888888' : '#888888') : 'inherit',
    borderRadius: '8px',
    marginBottom: '10px',
    position: 'relative',
    transition: 'background-color 0.3s, color 0.3s',
  }),
  taskText: (theme, completed) => ({
    flex: 1,
    textDecoration: completed ? 'line-through' : 'none',
    fontSize: '16px',
    fontWeight: '500',
    marginRight: '10px',
  }),
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  completeButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#28a745' : '#28a745',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  priorityButton: (theme, priority) => ({
    background: priority === 'high' ? (theme === 'dark' ? '#ffc107' : '#ffc107') : 'transparent',
    color: priority === 'high' ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#ffc107'),
    border: '2px solid',
    borderColor: priority === 'high' ? (theme === 'dark' ? '#ffc107' : '#ffc107') : 'transparent',
    // borderRadius: '50%',
    borderRadius: '8px',
    padding: '8px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s, color 0.3s',
  }),
  editButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#007bff' : '#007bff',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  moveButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#17a2b8' : '#17a2b8',
    border: 'none',
    borderRadius: '50%',
    padding: '7px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  removeButton: (theme) => ({
    background: theme === 'dark' ? '#dc3545' : '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
  }),
  saveButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#28a745' : '#28a745',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  emptyList: (theme) => ({
    textAlign: 'center',
    fontSize: '18px',
    color: theme === 'dark' ? '#888888' : '#888888',
    margin: '20px 0',
  }),
};

export default Home;
