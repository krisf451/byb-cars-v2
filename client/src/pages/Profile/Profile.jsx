import { useEffect, useState } from 'react';

import ProfileHeader from './ProfileHeader';
import CarSlider from './CarSlider';
import { getUsersCarsForSale, getUsersSoldCars, getUsersBoughtCars } from '../../api';

const Profile = () => {
  const [carsForSale, setCarsForSale] = useState([]);
  const [soldCars, setSoldCars] = useState([]);
  const [boughtCars, setBoughtCars] = useState([]);

  useEffect(() => {
    getUsersCarsForSale().then(({ data }) => setCarsForSale(data));
    getUsersSoldCars().then(({ data }) => setSoldCars(data));
    getUsersBoughtCars().then(({ data }) => setBoughtCars(data));
  }, []);

  return (
    <div
      className="relative pb-10"
    >
      <div className="absolute inset-x-0 w-full h-[220px] bg-gradient-to-l from-transparent to-black z-1 animate-slowfade dark:to-gray-300" />
      <ProfileHeader />
      <CarSlider cars={carsForSale} type="for sale" />
      <CarSlider cars={soldCars} type="sold" />
      <CarSlider cars={boughtCars} type="bought" />
    </div>
  );
};

export default Profile;
