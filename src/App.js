import React, { useState, useEffect } from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(null); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound('end-whistle');
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 60) {
      playSound('one-minute');
    }
  }, [timeLeft]);

  const startGame = () => {
    playSound('start-whistle');
    setTimeLeft(8 * 60); // 8 minutes in seconds
    setIsRunning(true);
  };

  const playSound = (type) => {
    let audio;
    if (type === 'start-whistle') {
      audio = new Audio('/sounds/start.mp3');
    } else if (type === 'one-minute') {
      audio = new Audio('/sounds/one-minute.mp3');
    } else if (type === 'end-whistle') {
      audio = new Audio('/sounds/end.mp3');
    }
    audio && audio.play();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Spiel-Timer</h1>
      {timeLeft !== null && <h2>Verbleibende Zeit: {formatTime(timeLeft)}</h2>}
      <button
        onClick={startGame}
        disabled={isRunning}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Start
      </button>
    </div>
  );
}

export default App;
