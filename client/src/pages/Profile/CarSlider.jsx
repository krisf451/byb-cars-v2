/* eslint-disable import/no-unresolved */
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';

const CarSlider = ({ cars, type }) => {
  let title;
  if (type === 'for sale') {
    title = 'Cars for sale';
  } else if (type === 'sold') {
    title = 'Sold cars';
  } else if (type === 'bought') {
    title = 'Purchased cars';
  }
  return (
    <div>
      {cars?.length > 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.2 }} className="relative flex flex-col items-center h-full w-full px-4">
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-xl text-gray-600">
              A list of {title}.
            </p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="relative h-max w-max">
            {cars.length > 3 ? (
              <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                grabCursor
                className="relative h-[320px] w-[1100px] rounded-lg"
              >
                {cars?.map((car) => (
                  <SwiperSlide key={car._id} className="h-[290px] !w-[210px] md:!w-[310px] p-2 mt-2">
                    <Link to={`/cars/${car._id}`}>
                      <img src={car?.image.startsWith('upload') ? `${import.meta.env.VITE_BASE_URL}/${car?.image}` : car?.image} alt="" className="h-full w-full object-cover rounded-lg shadow-sm shadow-black hover:shadow-lg hover:shadow-black transition-all duration-150 ease-linear hover:translate-y-[-8px] hover:scale-[102%]" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                className="relative h-[360px] w-auto rounded-lg flex"
              >
                {cars?.map((car) => (
                  <Link to={`/cars/${car._id}`} key={car._id} className="h-[290px] !w-[210px] md:!w-[310px] p-2 mt-2">
                    <img src={car?.image.startsWith('upload') ? `${import.meta.env.VITE_BASE_URL}/${car?.image}` : car?.image} alt="" className="h-full w-full object-cover rounded-lg shadow-sm shadow-black hover:shadow-lg hover:shadow-black transition-all duration-150 ease-linear hover:translate-y-[-8px] hover:scale-[102%]" />
                  </Link>
                ))}
              </div>
            )}

          </motion.div>
        </motion.div>
      ) : <div className="flex h-32 w-full items-center justify-center text-2xl dark:text-white">No Cars {type}</div>}
    </div>
  );
};

export default CarSlider;
