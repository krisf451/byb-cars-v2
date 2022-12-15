import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { setCurrentUser } from '../../redux/features/authSlice';
import { useGetAllCarsQuery, useToggleFavoriteCarMutation } from '../../redux/services/CARS';
import { ExploreSearchFilterButton } from '..';

const ExploreCars = ({ toggleModal, currentPage, setCurrentPage, isModalOpen }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const [toggleFavorite] = useToggleFavoriteCarMutation();
  const dispatch = useDispatch();

  const filteredCars = useGetAllCarsQuery({
    page: currentPage,
    make: searchParams.get('make'),
    model: searchParams.get('model'),
    color: searchParams.get('color'),
    price: searchParams.get('price'),
    yearFrom: searchParams.get('yearFrom'),
    yearTo: searchParams.get('yearTo'),
    isUsed: searchParams.get('isUsed'),
    sortBy: searchParams.get('sortBy'),
    order: searchParams.get('order'),
  });

  useEffect(() => {
    filteredCars.refetch();
  }, [filteredCars?.data?.data]);

  const handleToggleFavorite = (carId) => {
    toggleFavorite({ carId })
      .unwrap()
      .then((res) => {
        dispatch(setCurrentUser({ ...currentUser, favorites: [...res.data.favoriteCars] }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!filteredCars.isFetching) {
      setTotalPages(Math.ceil(filteredCars.data.totalCars / 20));
    }
  }, [filteredCars.data]);

  // if (filteredCars?.isFetching) {
  //   return (
  //     <div className="absolute inset-0 flex flex-col h-screen items-center justify-center space-y-12 text-2xl text-black dark:text-white font-serif ">
  //       <p className="underline underline-offset-[16px]">Loading...</p>
  //     </div>
  //   );
  // }

  if (filteredCars?.data?.data?.length <= 0) {
    return (
      <div className="absolute inset-0 flex flex-col h-screen items-center justify-center space-y-12 text-7xl text-black dark:text-white font-serif ">
        <p className="underline underline-offset-[16px]">No Results Found.</p>
        <button type="button" onClick={() => navigate(-1)} className="flex items-center bg-[#ffe6ee] text-[#ff236c] text-2xl font-normal rounded-full py-4 px-8 hover:underline">
          <MdKeyboardArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  if (filteredCars?.isError) {
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
    <motion.div className={`relative flex flex-col w-full ${isModalOpen ? 'h-screen overflow-hidden' : 'h-auto'}`}>
      <div className="flex items-center justify-end md:justify-between mb-12 dark:text-white font-sans">
        <p className="hidden md:block">Showing results of {0 || filteredCars?.data?.totalCars}</p>
        <div className="flex items-center space-x-4">
          {currentUser && (
            <Link to="/my-favorites" className="hover:underline hover:text-blue-800 dark:hover:text-blue-400">My Favorites</Link>
          )}
          <ExploreSearchFilterButton toggleModal={toggleModal} />
        </div>
      </div>
      <motion.div layout variants={variants} initial={{ opacity: 0 }} animate={!filteredCars?.isFetching && 'show'} className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] h-auto gap-8">
        <AnimatePresence>
          {filteredCars?.data?.data?.map((car, i) => (
            <motion.div
              key={car?._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              {(currentUser && currentUser?._id !== car?.ownerId)
                && (
                <div className="absolute z-10 -top-5 -left-5 flex items-center justify-center border-[1px] dark:text-white border-black/10 bg-white dark:bg-white/5 rounded-lg hover:shadow-lg transition-shadow h-11 w-11 cursor-pointer">
                  {currentUser?.favorites?.includes(car._id)
                    ? <FaHeart onClick={(e) => handleToggleFavorite(car._id, e)} className="h-6 w-6 text-red-500" />
                    : <FaRegHeart onClick={(e) => handleToggleFavorite(car._id, e)} className="h-6 w-6" />}
                </div>
                )}
              <div className="relative h-[420px] rounded-md border-[1px] border-black/10 bg-white dark:bg-white/5 p-4 hover:shadow-lg transition-shadow">
                <img src={car?.image.startsWith('upload') ? `${import.meta.env.VITE_BASE_URL}/${car?.image}` : car?.image} alt="car" className="h-[250px] w-full object-cover rounded-md" />
                <div className="divide-y divide-gray-200">
                  <div className="flex w-full py-4 dark:text-white">
                    <div className="grid grid-cols-2 h-full w-full justify-center font-semibold">
                      <Link to={`/cars/${car._id}`} className="group">
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
    </motion.div>
  );
};

export default ExploreCars;
