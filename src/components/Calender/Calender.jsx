import { useState } from 'react';

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

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-64">
        <div className="text-2xl font-semibold text-gray-500">{weekday}</div>
        <div className="text-5xl font-bold text-blue-600 my-2">{day}</div>
        <div className="text-xl text-gray-600">
          {month} {year}
        </div>
      </div>
    </div>
  );
};

export default Calender;