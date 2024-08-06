import React, { useState, useEffect } from 'react';
import './remainder.css';
import { FaTrashAlt } from 'react-icons/fa';
import reminderSound from '../components/assets/reminder-sound.mp3';

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      reminders.forEach(reminder => {
        if (reminder.time === now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) {
          alert(`Reminder: ${reminder.title}\nMessage: ${reminder.message}`);
          playSound();
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  const playSound = () => {
    const audio = new Audio(reminderSound);
    audio.play().catch(error => console.log('Error playing sound:', error));
  };

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

  const deleteReminder = (index) => {
    const newReminders = reminders.filter((_, i) => i !== index);
    setReminders(newReminders);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Set Reminders</h1>
      </header>

      <main>
        <div className="clock">
          <h2>{currentTime}</h2>
        </div>
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
          <button onClick={addReminder} className="addReminder">Add Reminder</button>

          <ul>
            {reminders.map((reminder, index) => (
              <li key={index}>
                <div className="reminder-details">
                  <span className="reminder-time">{reminder.time}</span> - <strong>{reminder.title}</strong>: {reminder.message}
                </div>
                <button onClick={() => deleteReminder(index)} className="delete-button"><FaTrashAlt /></button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;

// This Repo Created By Shubham
// ! But Chnaegs and modified By Me @UjjwalSaini07