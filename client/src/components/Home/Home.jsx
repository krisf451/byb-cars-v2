/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import 'swiper/css';

const dummy = [
  {
    id: 1,
    brand: 'Ferrari',
    model: '296 GTB 2022',
    image: 'https://source.unsplash.com/_4sWbzH5fp8/640×960',
    color: 'Silver',
    seat: '4 Seat',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
  {
    id: 2,
    brand: 'Ford',
    model: 'Mustang 2022',
    image: 'https://source.unsplash.com/fZmhlIEWVdA/640×960',
    color: 'Orange',
    seat: '4 Seat',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
  },
  {
    id: 3,
    brand: 'Porsche',
    model: '911 2022',
    image: 'https://source.unsplash.com/xpcUYaZtplI/640×960',
    color: 'Red',
    seat: '4 Seat',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: 4,
    brand: 'Mercedez-Benz',
    model: 'GT-Class 2022',
    image: 'https://source.unsplash.com/h5XcT5T0ST8/640×960',
    color: 'Blue',
    seat: '4 Seat',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
  },
];

const Home = () => {
  const [activeCar, setActiveCar] = useState({});
  const [showTitle, setShowTitle] = useState(true);

  setTimeout(() => {
    setShowTitle(false);
  }, 3000);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="relative flex items-center justify-center h-screen w-full">
      <div style={{ backgroundImage: `url(${activeCar?.image})` }} className="absolute inset-0 bg-no-repeat bg-cover bg-center h-full w-full transition-all duration-500 ease-in-out" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute bottom-0 right-0 h-full w-full bg-gradient-to-t from-darkBg mix-blend-multiply" />
      <div className="absolute inset-0 h-full w-full bg-white/5 backdrop-blur-lg" />
      <AnimatePresence>
        {showTitle && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.7 }} exit={{ opacity: 0 }} className="absolute left-[50%] top-16 -translate-x-[50%] -translate-y-[50%] text-white text-lg lg:text-[22px] font-serif font-semibold underline underline-offset-8">FEATURED</motion.p>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="relative h-max w-max">
        <Swiper
          observer
          observeParents
          spaceBetween={10}
          slidesPerView="auto"
          centeredSlides
          loop
          grabCursor
          className="relative h-[660px] w-[1347px] rounded-lg"
        >
          <SwiperButtonPrev><MdKeyboardArrowLeft /></SwiperButtonPrev>
          {dummy.map((car) => (
            <SwiperSlide key={car.id} className={`h-[560px] !w-[340px] md:!w-[440px] p-2 ${car.id !== activeCar.id && 'overflow-visible !translate-y-16 scale-90'} transition-transform duration-300`}>
              {({ isActive }) => (
                <SwiperImage car={car} isActive={isActive} setActiveCar={setActiveCar} />
              )}
            </SwiperSlide>
          ))}
          <SwiperButtonNext><MdKeyboardArrowRight /></SwiperButtonNext>
        </Swiper>
        <HomeCarInfo cars={dummy} activeCar={activeCar} />
      </motion.div>
    </motion.div>
  );
};

const SwiperButtonPrev = ({ children }) => {
  const swiper = useSwiper();
  return (
    <motion.button
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      type="button"
      onClick={() => swiper.slidePrev()}
      className="absolute z-10 left-[31rem] bottom-0 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 text-black hover:bg-black hover:text-white transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
};

const SwiperButtonNext = ({ children }) => {
  const swiper = useSwiper();
  return (
    <motion.button
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      type="button"
      onClick={() => swiper.slideNext()}
      className="absolute z-10  right-[31rem] bottom-0 flex items-center justify-center h-7 w-7 rounded-full bg-white/90 text-black hover:bg-black hover:text-white transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
};

const SwiperImage = ({ isActive, car, setActiveCar }) => {
  useEffect(() => {
    if (isActive) {
      setActiveCar(car);
    }
  }, [isActive]);

  return (
    <img src={car?.image} alt="" className="h-full w-full object-cover rounded-lg shadow-sm shadow-black hover:shadow-lg hover:shadow-black transition-shadow duration-150 ease-linear" />
  );
};

const HomeCarInfo = ({ cars, activeCar }) => {
  const car = cars.find((item) => item.id === activeCar.id);

  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="absolute left-[34%] -bottom-10 -translate-x-[34%] -translate-y-[34%] flex flex-col items-center justify-center text-white">
      <div className="relative flex flex-col items-center justify-center w-[425px] p-4">
        <p className="flex flex-col items-center justify-center text-[30px] md:text-[30px] font-serif">
          {car?.model}
          <span className="text-lg md:text-xl text-gray-300">{car?.brand}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Home;
