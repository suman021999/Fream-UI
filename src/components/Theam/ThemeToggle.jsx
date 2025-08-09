import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hook/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 border-amber-200' : 'bg-gray-200 border-gray-700 '}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ?  <div className='bg-[#85858552] cursor-pointer flex justify-center items-center rounded-full h-10 w-10'><FaMoon className='text-amber-50' size={20} /></div>:
      <div className='bg-[#121111bc] cursor-pointer flex justify-center items-center rounded-full h-10 w-10 text-amber-50'><FaSun  size={20} /></div>}
    </button>
  );
};

export default ThemeToggle;


