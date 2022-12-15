import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { GiSun, GiMoonBats } from 'react-icons/gi';

import { useDarkMode } from '../../hooks';
import { selectIsDarkMode } from '../../redux/features/darkModeSlice';

const DarkModeToggler = ({ hoverOnOther, hoverLeave }) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectIsDarkMode(darkTheme));
  }, [darkTheme]);

  const handleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <motion.span
      onMouseEnter={hoverOnOther}
      onMouseLeave={hoverLeave}
      onClick={handleTheme}
      className="text-darkBg dark:text-white absolute top-[25px] right-[25px] rounded-full"
    >
      {darkTheme ? <GiSun className="h-7 w-7" /> : <GiMoonBats className="h-7 w-7" />}
    </motion.span>
  );
};

export default DarkModeToggler;

