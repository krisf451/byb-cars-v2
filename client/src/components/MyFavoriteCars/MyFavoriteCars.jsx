import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { useGetUserFavoriteCarsQuery, useToggleFavoriteCarMutation } from '../../redux/services/CARS';
import { setCurrentUser } from '../../redux/features/authSlice';

const MyFavoriteCars = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, isFetching, isError } = useGetUserFavoriteCarsQuery();
  const [toggleFavorite] = useToggleFavoriteCarMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isFetching) {
      setTotalPages(Math.ceil(data.length / 20));
    }
  }, [data]);

  const handleToggleFavorite = (carId) => {
    console.log(carId, 'TEST1');
    // dispatch(asyncToggleFavorite(carId));
    toggleFavorite({ carId })
      .unwrap()
      .then((res) => {
        console.log(res.data);
        dispatch(setCurrentUser({ ...currentUser, favorites: [...res.data.favoriteCars] }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isFetching) {
    return (
      <div className="absolute inset-0 flex flex-col h-screen items-center justify-center space-y-12 text-2xl text-black dark:text-white font-serif ">
        <p className="underline underline-offset-[16px]">Loading...</p>
      </div>
    );
  }

  if (data?.length <= 0) {
    return (
      <div className="absolute inset-0 flex flex-col h-screen items-center justify-center space-y-12 text-7xl text-black dark:text-white font-serif ">
        <p className="underline underline-offset-[16px]">No Favorites Yet</p>
        <button type="button" onClick={() => navigate('/explore')} className="flex items-center bg-[#ffe6ee] text-[#ff236c] text-2xl font-normal rounded-full py-4 px-8 hover:underline">
          Go to Explore <MdKeyboardArrowRight className="mr-2" />
        </button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-2xl dark:text-white">Error in query or check connection.</div>
    );
  }

  const variants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
        when: 'beforeChildren',
      },
    },
  };

  return (
    <div className="h-full w-full px-[10%] py-6">
      <div className="flex justify-end md:justify-between h-auto w-full mb-12">
        <p className="text-lg font-serif dark:text-white">My Favorites</p>
        <Link to="/explore" className="hidden md:block text-base font-serif bg-[#f1fafb] text-[#4993fa] hover:bg-[#e4fcff] hover:text-[#407dd3] rounded-full px-4 py-1 transition-colors duration-300">
          Back to Explore
        </Link>
      </div>
      <motion.div layout variants={variants} initial={{ opacity: 0 }} animate={!isFetching && 'show'} className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] h-auto gap-8 ">
        <AnimatePresence>
          {data?.map((car, i) => (
            <motion.div
              key={car?._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute z-10 -top-5 -left-5 flex items-center justify-center border-[1px] dark:text-white border-black/10 bg-white dark:bg-white/5 rounded-lg hover:shadow-lg transition-shadow h-11 w-11 cursor-pointer">
                <TiDelete onClick={() => handleToggleFavorite(car._id)} className="h-8 w-8 text-red-500" />
              </div>
              <div className="relative h-[420px] rounded-md border-[1px] border-black/10 bg-white dark:bg-white/5 p-4 hover:shadow-lg transition-shadow">
                <img src={car?.image} alt="" className="h-[250px] w-full object-cover rounded-md" />
                <div className="divide-y divide-gray-200">
                  <div className="flex w-full py-4 dark:text-white">
                    <div className="grid grid-cols-2 h-full w-full justify-center font-semibold">
                      <Link to={`/cars/${car?._id}`} className="group">
                        <p className="flex flex-col text-lg font-semibold group-hover:text-blue-800 dark:group-hover:text-blue-400">
                          {car?.make}
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-normal group-hover:text-blue-800 dark:group-hover:text-blue-400">
                            {car?.model} - {car?.year}
                          </span>
                        </p>
                      </Link>
                      <p className="text-lg text-right">${car?.price}</p>
                    </div>
                  </div>
                  <div className="flex text-center space-x-2 pt-5 text-sm text-[#4993fa] uppercase">
                    <span className="flex py-1 px-3 align-center w-max rounded-full bg-[#f1fafb] text-sm ">
                      {car?.color}
                    </span>
                    <span className="flex items-center w-max py-1 px-3 rounded-full bg-[#f1fafb] text-sm">
                      {car?.isUsed ? 'Used' : 'New'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex items-center justify-center gap-8 mt-12 dark:text-white dark:bg-darkBg">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center h-[30px] w-[30px] rounded-full shadow-lg cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          <MdKeyboardArrowLeft className="h-5 w-5 bg-transparent" />
        </button>
        <p className="flex justify-center my-8 font-semibold">{currentPage} of {totalPages && totalPages}</p>
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center h-[30px] w-[30px] rounded-full shadow-lg cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          <MdKeyboardArrowRight className="h-5 w-5 bg-transparent" />
        </button>
      </div>
    </div>
  );
};

export default MyFavoriteCars;
