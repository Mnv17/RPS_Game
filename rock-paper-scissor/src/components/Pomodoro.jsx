import React, { useState, useEffect } from 'react';
import './Pomodoro.css';

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsActive(false);
            setIsBreak(!isBreak);
            return isBreak ? workDuration * 60 : breakDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, time, isBreak, workDuration, breakDuration]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(workDuration * 60);
  };

  const handleWorkChange = (e) => {
    setWorkDuration(Number(e.target.value));
    if (!isActive && !isBreak) {
      setTime(Number(e.target.value) * 60);
    }
  };

  const handleBreakChange = (e) => {
    setBreakDuration(Number(e.target.value));
  };

  const totalDuration = isBreak ? breakDuration * 60 : workDuration * 60;
  const progressPercentage = ((totalDuration - time) / totalDuration) * 100;

  return (
    <div className="pomodoro-container">
      <h1 className="pomodoro-title">{isBreak ? 'Break Time' : 'Work Time'}</h1>
      
      <div className="pomodoro-timer">
        {formatTime(time)}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className="pomodoro-controls">
        <button className="pomodoro-button" onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
        <button className="pomodoro-button" onClick={handleReset}>Reset</button>
      </div>
      
      <div className="pomodoro-settings">
        <label className="pomodoro-label">
          Work Duration (minutes):
          <input className="pomodoro-input" type="number" value={workDuration} onChange={handleWorkChange} />
        </label>
        <label className="pomodoro-label">
          Break Duration (minutes):
          <input className="pomodoro-input" type="number" value={breakDuration} onChange={handleBreakChange} />
        </label>
      </div>
    </div>
  );
};

export default Pomodoro;
