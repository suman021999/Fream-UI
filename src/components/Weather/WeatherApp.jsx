
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hook/ThemeContext';

const WeatherApp = () => {
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const apiKey = '1b1db00c65d20252cea896b52d380a9b';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setTemperature({
          tempC: Math.round(data.main.temp),
          tempF: Math.round((data.main.temp * 9/5) + 32)
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 max-w-xs mx-auto mt-10">
        <p>{error}</p>
      </div>
    );
  }

      



  return (
    <div >
      <div className="relative w-64">
        <button 
          onClick={toggleUnit}
          className="absolute top-3 h-10 w-10 bg-blue-100 rounded-full right-3 text-lg font-medium text-blue-600 hover:bg-blue-300 transition-colors flex justify-center items-center"
        >
          {unit}°
        </button>

        <div className="mt-6 flex items-center justify-center">
          <span className={`text-5xl font-bold text-gray-800 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {unit === 'C' ? temperature.tempC : temperature.tempF} {unit}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;