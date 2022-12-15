import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../../hooks';
import { NavMenuItems, NavMenuAuth, DarkModeToggler, NavMenuCircleEffect } from '..';

import './styles.css';

const NavMenu = ({ toggler, isOpen, bgVariants }) => {
  const mousePosition = useMousePosition();
  const [cursorVariant, setCursorVariant] = useState('default');

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    },
    hoverRoute: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: '#fff',
      mixBlendMode: 'difference',
    },
    hoverOther: {
      height: 50,
      width: 50,
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      backgroundColor: '#fff',
      mixBlendMode: 'difference',
    },
  };

  const hoverOnRoute = () => setCursorVariant('hoverRoute');
  const hoverOnOther = () => setCursorVariant('hoverOther');
  const hoverLeave = () => setCursorVariant('default');

  return (
    <motion.div
      variants={bgVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className={`relative isolate flex flex-col items-center justify-center h-screen w-full cursor-none overflow-hidden ${isOpen ? 'bg-white dark:bg-darkBg pointer-events-auto' : ''} transition duration-300 ease-in-out`}
    >
      <NavMenuAuth toggler={toggler} hoverOnOther={hoverOnOther} hoverLeave={hoverLeave} />
      <DarkModeToggler hoverOnOther={hoverOnOther} hoverLeave={hoverLeave} />
      <NavMenuCircleEffect />
      <NavMenuItems toggler={toggler} hoverOnRoute={hoverOnRoute} hoverLeave={hoverLeave} />
      <motion.div variants={variants} animate={cursorVariant} className={`${!isOpen && 'hidden'} fixed top-0 left-0 h-6 w-6 bg-red-600 rounded-full pointer-events-none`} />
    </motion.div>
  );
};

export default NavMenu;
