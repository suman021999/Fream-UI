import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hook/ThemeContext';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // Handle start/stop
  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  // Handle reset
  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Effect to handle the timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div>
      <div className=" max-w-md w-64">
        <h1 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Stopwatch</h1>
        
        <div className="text-center mb-8">
          <div className={`text-5xl font-mono font-bold text-gray-900 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleRunning}
            className={`px-6 py-3 rounded-lg font-semibold text-white cursor-pointer ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-colors`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          
          <button
            onClick={reset}
            className={`px-6 py-3 cursor-pointer rounded-lg font-semibold  transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-600'}`}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;