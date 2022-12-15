import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import './styles.css';

const authRoutes = [
  {
    route: '/',
    label: 'HOME',
  },
  {
    route: '/profile', // not actual route
    label: 'PROFILE',
  },
  {
    route: '/explore',
    label: 'EXPLORE',
  },
  {
    route: '/sales', // not actual route
    label: 'SELL',
  },
];

const notAuthRoutes = [
  {
    route: '/',
    label: 'HOME',
  },
  {
    route: '/auth',
    label: 'SIGN UP / LOGIN',
  },
  {
    route: '/explore',
    label: 'EXPLORE',
  },
  {
    route: '/sales', // not actual route
    label: 'SELL',
  },
];

const NavMenuItems = ({ toggler, hoverOnRoute, hoverLeave }) => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col items-center justify-center">
      {currentUser
        ? (
          authRoutes.map((route, key) => (
            <NavLink key={key} to={route.route} className={({ isActive }) => (isActive ? 'w-max border-b-2 border-red-600 cursor-none' : 'cursor-none')}>
              <motion.p
                onMouseEnter={hoverOnRoute}
                onMouseLeave={hoverLeave}
                onClick={toggler}
                className="navigation-link relative w-max text-center text-black dark:text-white text-[45px] md:text-[60px] lg:text-[70px] 2xl:text-[90px] font-serif"
              >
                {route.label}
              </motion.p>
            </NavLink>
          ))
        ) : (
          notAuthRoutes.map((route, key) => (
            <NavLink key={key} to={route.route} className={({ isActive }) => (isActive ? 'w-max border-b-2 border-red-600 cursor-none' : 'cursor-none')}>
              <motion.p
                onMouseEnter={hoverOnRoute}
                onMouseLeave={hoverLeave}
                onClick={toggler}
                className="navigation-link relative w-max text-center text-black dark:text-white text-[45px] md:text-[60px] lg:text-[70px] 2xl:text-[90px] font-serif"
              >
                {route.label}
              </motion.p>
            </NavLink>
          ))
        )}
    </div>
  );
};

export default NavMenuItems;
