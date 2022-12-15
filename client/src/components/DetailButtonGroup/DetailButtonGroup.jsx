import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DetailButtonGroup = ({ currentUser, data, handleDelete, handleCheckout, setOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (

    <>
      <div className="flex flex-wrap -mx-1 overflow-hidden sm:px-1">
        {currentUser?._id === data?.data?.ownerId && data?.data?.status !== 'sold' && (
          <div className=" flex flex-row w-full overflow-hidden h-10 gap-2">
            <div className="w-full p-0.5">
              <button type="button" onClick={handleDelete} className="bg-red-500 rounded-lg w-full h-full dark:bg-transparent dark:outline dark:outline-red-500 hover:bg-red-300 transition-color duration-200 dark:md:hover:outline-red-200">Delete</button>
            </div>
            <div className="w-full p-0.5">
              <button onClick={() => setOpen(true)} type="button" className="bg-emerald-500 rounded-lg w-full h-full dark:bg-transparent dark:outline dark:outline-green-500 hover:bg-emerald-300 transition-color duration-200 dark:md:hover:outline-emerald-200">Update</button>
            </div>
          </div>
        )}

      </div>
      <div className="flex flex-wrap overflow-hidden sm:-mx-1 h-14">
        {currentUser?._id !== data?.data?.ownerId
          ? (
            <>
              <div className="w-1/2 overflow-hidden sm:my-1 sm:px-1 h-full">
                <button type="button" onClick={() => navigate(-1)} className="flex items-center justify-center dark:bg-transparent dark:outline  dark:outline-blue-500 mt-1 bg-blue-500 rounded-lg w-full h-3/4 hover:bg-blue-300 transition-color duration-200 dark:md:hover:outline-blue-200">
                  <ArrowLeftIcon className=" h-5 w-5 text-black-500 mr-1" />
                  Go Back
                </button>
              </div>
              {data?.data?.status !== 'sold' && (
              <div className="w-1/2 overflow-hidden sm:my-1 sm:px-1 h-full">
                <button type="button" onClick={handleCheckout} className="bg-purple-500 dark:bg-transparent dark:outline  dark:outline-purple-500 mt-1 rounded-lg w-full h-3/4 hover:bg-purple-300 transition-color duration-200 dark:md:hover:outline-purple-200">Pay With Stripe</button>
              </div>
              )}
            </>
          ) : (
            <>
              <div className="w-full overflow-hidden sm:my-1 sm:px-1 h-full flex gap-2">
                <button onClick={() => navigate('/profile')} type="button" className="flex text-white items-center justify-center bg-blue-700 dark:bg-transparent dark:outline  dark:outline-blue-500 mt-1 rounded-lg w-full h-3/4 dark:md:hover:outline-blue-200">
                  <ArrowLeftIcon className="h-5 w-5 text-white mr-1" /> Profile
                </button>
                <button onClick={() => navigate('/explore')} type="button" className="flex items-center justify-center bg-blue-500 dark:bg-transparent dark:outline  dark:outline-blue-500 mt-1 rounded-lg w-full h-3/4 dark:md:hover:outline-blue-200">
                  <ArrowLeftIcon className="h-5 w-5 text-black-500 mr-1" /> Back to Explore
                </button>
              </div>
              {data?.data?.status !== 'sold' && (
              <div className="w-1/2 overflow-hidden sm:my-1 sm:px-1 h-full">
                <button type="button" onClick={handleCheckout} className="bg-purple-500 dark:bg-transparent dark:outline  dark:outline-purple-500 mt-1 rounded-lg w-full h-3/4 hover:bg-purple-300 transition-color duration-200 dark:md:hover:outline-purple-200">Pay With Stripe</button>
              </div>
              )}
            </>
          )}
      </div>
    </>
  );
};

export default DetailButtonGroup;
