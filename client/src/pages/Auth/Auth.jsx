import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { asyncSignup, asyncSignin, reset } from '../../redux/features/authSlice';

const Auth = () => {
  const { currentUser, isError, isSuccess, errorMessage } = useSelector(
    (state) => state.auth,
  );
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [signInAttempts, setSignInAttempts] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, email, password, confirmPassword } = formValues;

  const clear = () => { setFormValues({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }); };

  useEffect(() => {
    if (formValues.email.length > 4 && formValues.password.length !== 0 && signInAttempts > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formValues]);

  useEffect(() => {
    if (isError) {
      toast.error(`${errorMessage}. ${signInAttempts} attempts left.`);
      if (!isSignup) {
        setSignInAttempts((prev) => prev - 1);
        if (signInAttempts === 0) {
          setIsDisabled(true);
        }
      }
    }
    if (isSuccess || currentUser) {
      navigate('/');
      clear();
    }

    return () => dispatch(reset());
  }, [isSuccess, currentUser, dispatch, navigate, isError, errorMessage]);

  const handleChange = (e) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) toast.error('Passwords do not match');
      dispatch(asyncSignup(formValues));
    } else {
      dispatch(asyncSignin(formValues));
    }
  };

  return (
    <div className={`h-full w-full flex flex-col items-center bg-white dark:bg-darkBg transition-colors duration-300 ease-in-out ${isSignup ? 'pt-20' : 'pt-32'}`}>
      <section className="text-3xl font-semibold mb-8 px-5">
        <div className="flex gap-2">
          <FaUser className="dark:fill-white" />
          <h1 className="dark:text-white">
            {isSignup ? 'Register' : 'Login'}
          </h1>
        </div>
        <p className="text-gray-400">
          {isSignup ? 'Create your acccount' : 'Check Out Whats New'}
        </p>
        <button
          type="button"
          onClick={() => setIsSignup((prev) => !prev)}
        >
          <p className="text-sm cursor-pointer text-blue-600"> {isSignup
            ? 'Already have an account? Login'
            : 'New to our app? Register'}
          </p>
        </button>
      </section>
      <section className="w-[95%] xs:w-96 mx-auto">
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div>
                <label className="custom-label" htmlFor="firstName">
                  First Name
                  <input
                    type="text"
                    className="custom-input"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    autoComplete="firstName"
                    placeholder="Enter Your First Name"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="custom-label" htmlFor="lastName">
                  Last Name
                  <input
                    type="text"
                    className="custom-input"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    autoComplete="lastName"
                    placeholder="Enter Your Last Name"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </>
          )}
          <div>
            <label className="custom-label" htmlFor="email">Email
              <input
                type="email"
                className="custom-input"
                id="email"
                name="email"
                value={email}
                autoComplete="email"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
            </label>

          </div>
          <div className="relative">
            <label className="custom-label" htmlFor="password">Password
              <input
                type={showPassword ? 'text' : 'password'}
                className="custom-input"
                id="password"
                name="password"
                value={password}
                autoComplete="current-password"
                placeholder="Enter Your Password"
                onChange={handleChange}

              />
            </label>
            <div
              className="absolute right-[10px] top-[37px] cursor-pointer opacity-20"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <MdVisibilityOff size={25} />
              ) : (
                <MdVisibility size={25} />
              )}
            </div>
          </div>
          {isSignup && (
            <div>
              <label className="custom-label" htmlFor="confirmPassword">Confirm Password
                <input
                  type="password"
                  className="custom-input"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Repeat Your Password"
                  onChange={handleChange}
                />
              </label>

            </div>
          )}
          <button type="submit" className={`custom-btn ${isDisabled ? 'bg-gray-400' : 'cursor-pointer'}`} disabled={isDisabled}>
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Auth;
