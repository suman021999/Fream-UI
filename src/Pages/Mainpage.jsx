
import React from 'react';
import WeatherApp from '../components/Weather/WeatherApp';
import Calender from '../components/Calender/Calender';
import Stopwatch from '../components/Stopwatch/Stopwatch';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import MapContainerComponent from '../components/Maps/MapContainer';
import ThemeToggle from '../components/Theam/ThemeToggle';
import { useTheme } from '../hook/ThemeContext'; // Import the useTheme hook

const Mainpage = () => {
  // Use the theme context instead of local state
  const { isDarkMode } = useTheme();

  return (
    <>
      <section
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <div className={`p-4 flex gap-4 rounded-lg shadow-md h-[90vh] w-[80vw] border-4  ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`}>

          <div className='flex gap-3 h-[88vh]'>

            <div className='flex flex-col gap-4 w-[55vw]'>

              <div className='flex gap-4 h-[40vh]'>
                <div className={`flex justify-center items-center w-[500px] border-4 ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`}
                >
                  <WeatherApp /></div>
                <div className={`flex justify-center items-center w-[500px] border-4 ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`}
                >
                  <Calender /></div>
              </div>

              <div className={`flex justify-center items-center h-[42vh] border-4 ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`}
              >
                <MapContainerComponent />
              </div>
            </div>

            <div className='flex gap-4 flex-col w-[22vw]'>
              <div className={`flex justify-center items-center h-[20vh] p-2 border-4  ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`} >
                <DigitalClock /></div>
              <div className={`flex justify-center items-center h-[40vh] p-2 border-4 ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`}>
                <Stopwatch isDarkMode={isDarkMode} />
              </div>
              <div className={`flex justify-center items-center h-[20vh] p-2 border-4  ${isDarkMode ? 'bg-[#dbe1e312] border-amber-50' : 'bg-[#dbe1e39d] border-gray-700'}`} >
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Mainpage;