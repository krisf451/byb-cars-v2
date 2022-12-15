import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks';
import { NavMenu, NavToggler } from '..';

const Nav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const variants = {
    open: {
      clipPath: `circle(${(height + 1000) * 2 + 200}px at 40px 40px)`,
      transition: {
        duration: 1,
      },
    },
    closed: {
      clipPath: 'circle(25px at 40px 40px)',
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="fixed z-50 top-0 left-0 bottom-0 h-full w-full pointer-events-none"
    >
      <motion.div variants={variants} initial="close" animate={isOpen ? 'open' : 'closed'} className="absolute top-0 left-0 bottom-0 bg-white dark:bg-darkBg h-full w-full" />
      <NavToggler toggler={toggleOpen} isOpen={isOpen} />
      <NavMenu toggler={toggleOpen} isOpen={isOpen} bgVariants={variants} />
    </motion.nav>
  );
};

export default Nav;
