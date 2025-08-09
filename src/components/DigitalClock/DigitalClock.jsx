"use client";

import { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const hours = time.getHours() % 12 || 12;
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-20 p-4 bg-white">
        <div className=" text-black font-mono text-4xl mt-2 rounded-lg inline-flex items-center">
              <span className="time-segment">{formatTime(hours)}</span>
              <span className="time-separator mx-1">:</span>
              <span className="time-segment">{minutes}</span>
              <span className="time-separator mx-1">:</span>
              <span className="time-segment">{seconds}</span>
              <span className="ampm text-xl ml-2">{ampm}</span>
        </div>
      </div>

      
    </>
  );
};

export default DigitalClock;
