import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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
      <div className="bg-white p-8 rounded-lg shadow-lg  max-w-md w-64">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Stopwatch</h1>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-mono font-bold text-gray-900">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleRunning}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-colors`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
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