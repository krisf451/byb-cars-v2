import { useDispatch, useSelector } from 'react-redux';
import { BsPersonCircle } from 'react-icons/bs';
import { logout } from '../../redux/features/authSlice';

import './styles.css';

const NavMenuAuth = ({ toggler, hoverOnOther, hoverLeave }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div>
      {currentUser && (
        <div className="flex absolute top-[27px] md:top-[23px] left-20 md:left-24 text-base md:text-lg text-center text-black dark:text-white">
          <p className="flex mr-4 font-serif"><BsPersonCircle className="h-6 w-6 md:h-7 md:w-7 mr-3" />{currentUser?.email}</p>
          <p> | </p>
          <button
            type="button"
            onMouseEnter={hoverOnOther}
            onMouseLeave={hoverLeave}
            className="navigation-link relative w-max appearance-none cursor-none font-serif ml-5"
            onClick={() => {
              dispatch(logout());
              toggler();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavMenuAuth;
