/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const NavToggler = ({ toggler, isOpen }) => (
  <button
    onClick={toggler}
    type="button"
    className={`absolute z-20 flex items-center justify-center border-0 outline-none focus:outline-none top-[15px] left-[15px] h-[50px] w-[50px] rounded-full ${isOpen ? 'cursor-none' : ''} pointer-events-auto`}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path d="M 2 2.5 L 20 2.5" />
      <Path d="M 2 9.423 L 20 9.423" />
      <Path d="M 2 16.346 L 20 16.346" />
    </svg>
  </button>
);

const Path = (props) => {
  const { isDarkMode } = useSelector((state) => state.darkModeSlice);

  return (
    <path
      fill={isDarkMode ? '#fff' : '#000'}
      strokeWidth="3"
      stroke={isDarkMode ? '#fff' : '#000'}
      strokeLinecap="round"
      {...props}
    />
  );
};

export default NavToggler;
