import { useState } from 'react';
import { useTheme } from '../../hook/ThemeContext';

const Calender = () => {
  const [currentDate] = useState(new Date());
  
  // Format options
  const weekdayOptions = { weekday: 'long' };
  const monthOptions = { month: 'long' };
  
  // Get formatted parts
  const weekday = currentDate.toLocaleDateString(undefined, weekdayOptions);
  const month = currentDate.toLocaleDateString(undefined, monthOptions);
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const { isDarkMode } = useTheme();

  return (
    <div>
      <div className="text-center w-64">
        <div className={`text-2xl font-semibold  ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{weekday}</div>
        <div className={`text-5xl font-bold my-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{day}</div>
        <div className={`text-xl text-gray-600 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {month} {year}
        </div>
      </div>
    </div>
  );
};

export default Calender;