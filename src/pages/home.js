import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPlus, FaArrowUp, FaArrowDown, FaEdit, FaCheck, FaStar, FaSort } from 'react-icons/fa';

const Home = ({ theme }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortByDate, setSortByDate] = useState(false);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f9f9f9';
  }, [theme]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false, priority: 'normal', dueDate }]);
      setInputValue('');
      setDueDate('');
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
    setDueDate(tasks[index].dueDate);
  };

  const saveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editValue;
    newTasks[index].dueDate = dueDate;
    setTasks(newTasks);
    setIsEditing(null);
    setDueDate('');
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

  const sortTasksByDate = (tasks) => {
    return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const filteredTasks = tasks
    .filter(task => priorityFilter === 'all' ? true : task.priority === priorityFilter)
    .sort((a, b) => sortByDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0);

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
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          style={styles.datePicker(theme)}
        />
        <button onClick={addTask} style={styles.addButton(theme)}>
          <FaPlus style={styles.addIcon} />
        </button>
      </div>
      <div style={styles.filterContainer}>
        <button onClick={() => setPriorityFilter('all')} style={styles.filterButton(theme, priorityFilter === 'all')}>All</button>
        <button onClick={() => setPriorityFilter('high')} style={styles.filterButton(theme, priorityFilter === 'high')}>High Priority</button>
        <button onClick={() => setPriorityFilter('normal')} style={styles.filterButton(theme, priorityFilter === 'normal')}>Normal Priority</button>
        <button onClick={() => setSortByDate(!sortByDate)} style={styles.sortButton(theme, sortByDate)}>
          <FaSort />
        </button>
      </div>
      <ul style={styles.list}>
        {filteredTasks.length === 0 ? (
          <li style={styles.emptyList(theme)}>No tasks yet!</li>
        ) : (
          filteredTasks.map((task, index) => (
            <li key={index} style={styles.listItem(theme, task.completed, task.priority, task.dueDate)}>
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={styles.input(theme)}
                  />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={handleDueDateChange}
                    style={styles.datePicker(theme)}
                  />
                  <button onClick={() => saveTask(index)} style={styles.saveButton(theme)}>
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  <span style={styles.taskText(theme, task.completed)}>{task.text}</span>
                  {task.dueDate && <span style={styles.dueDate(theme, task.dueDate)}>{task.dueDate}</span>}
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
    maxWidth: '600px',
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
    boxShadow: theme === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
  }),
  datePicker: (theme) => ({
    padding: '12px',
    border: '2px solid',
    borderColor: theme === 'dark' ? '#555555' : '#dddddd',
    borderRadius: '8px',
    marginRight: '10px',
    fontSize: '16px',
    backgroundColor: theme === 'dark' ? '#2e2e2e' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#333333',
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
    marginLeft: '98px',
  },
  filterButton: (theme, isActive) => ({
    padding: '10px 11px',
    borderRadius: '8px',
    borderColor: theme === 'dark' ? '#007bff' : '#0072ff',
    background: isActive ? (theme === 'dark' ? '#007bff' : '#0072ff') : 'transparent',
    color: isActive ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#0072ff'),
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '5px',
    fontSize: '14px',
    transition: 'background 0.3s, color 0.3s',
  }),
  sortButton: (theme, isActive) => ({
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: isActive ? (theme === 'dark' ? '#4caf50' : '#81c784') : 'transparent',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  list: {
    width: '100%',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: (theme, completed, priority, dueDate) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: completed ? (theme === 'dark' ? '#2e2e2e' : '#f0f0f0') : (theme === 'dark' ? '#3e3e3e' : '#ffffff'),
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? (theme === 'dark' ? '#757575' : '#b0b0b0') : (theme === 'dark' ? '#ffffff' : '#333333'),
    borderLeft: priority === 'high' ? '5px solid #f44336' : '5px solid transparent',
    borderRight: dueDate && new Date(dueDate) < new Date() && !completed ? '5px solid #f44336' : '5px solid transparent',
    boxShadow: theme === 'dark' ? '0 4px 10px rgba(0, 0, 0, 0.1)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
  }),
  taskText: (theme, completed) => ({
    flex: 1,
    fontSize: '16px',
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? (theme === 'dark' ? '#757575' : '#b0b0b0') : (theme === 'dark' ? '#ffffff' : '#333333'),
  }),
  dueDate: (theme, dueDate) => ({
    marginLeft: '5px',
    fontSize: '14.4px',
    marginRight: '14px',
    color: new Date(dueDate) < new Date() ? '#f44336' : theme === 'dark' ? '#b0b0b0' : '#757575',
  }),
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '3.5px',
  },
  completeButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#28a745' : '#28a745',
    border: 'none',
    borderRadius: '50%',
    padding: '7px',
    marginRight: '2px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  priorityButton: (theme, priority) => ({
    background: priority === 'high' ? (theme === 'dark' ? '#ffc107' : '#ffc107') : 'transparent',
    color: priority === 'high' ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#ffc107'),
    border: '2px solid',
    borderColor: priority === 'high' ? (theme === 'dark' ? '#ffc107' : '#ffc107') : 'transparent',
    borderRadius: '10px',
    padding: '5px',
    marginRight: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s, color 0.3s',
  }),
  editButton: (theme) => ({
    background: 'transparent',
    color: theme === 'dark' ? '#007bff' : '#007bff',
    border: 'none',
    borderRadius: '50%',
    padding: '5px',
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
    padding: '4.4px',
    marginRight: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'color 0.3s',
  }),
  removeButton: (theme) => ({
    background: theme === 'dark' ? '#dc3545' : '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
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
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? '#3e3e3e' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    textAlign: 'center',
  }),
};

export default Home;
