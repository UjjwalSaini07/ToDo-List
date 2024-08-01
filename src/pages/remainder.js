import React, { useState, useEffect } from 'react';
import './remainder.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      reminders.forEach(reminder => {
        if (reminder.time === currentTime) {
          alert(`Reminder: ${reminder.title}\nMessage: ${reminder.message}`);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (title && time && message) {
      setReminders([...reminders, { title, time, message }]);
      setTitle('');
      setTime('');
      setMessage('');
    } else {
      alert('Please fill in all fields before adding a reminder.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List with Reminders</h1>
      </header>

      <main>
        <div className="reminder-section">
          <h2>Add Reminder</h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Reminder Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={addReminder}>Add Reminder</button>

          <ul>
            {reminders.map((reminder, index) => (
              <li key={index}>
                {reminder.title} at {reminder.time} - {reminder.message}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
