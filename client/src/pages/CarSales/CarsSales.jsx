import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Input from '../../components/Input/Input';

const CarsSales = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [carData, setCarData] = useState({ make: '', model: '', color: '', year: '', mileage: '', price: '', condition: '', description: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newCar = {
      ...carData,
      isUsed: carData.condition === 'used',
    };

    const bodyFormData = new FormData();

    for (const [key, value] of Object.entries(newCar)) {
      bodyFormData.append(key, value);
    }
    bodyFormData.append('image', image);

    axios({
      method: 'post',
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/cars`,
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data', authorization: `Bearer ${currentUser.token}` },
    }).then((response) => {
      // handle success
      setLoading(false);
      console.log(response);
      toast.success('Succesfully Added New Car!!');
      navigate('/explore');
    })
      .catch((response) => {
        // handle error
        setLoading(false);
        console.log(response);
      });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center animate-spin">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_395126.png&f=1&nofb=1" className="h-16 w-16" alt="" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 px-4 md:px-20 h-full dark:text-white">
      <form onSubmit={handleSubmit} className="relative flex flex-col items-center w-full p-4 rounded-lg border-[1px] border-gray-200">
        <div className="relative p-4 w-full grid gap-6 lg:grid-cols-2 bg-white dark:bg-darkBg rounded-lg">
          <p className="col-span-2 font-serif font-bold text-3xl md:text-4xl border-b-[1px] border-gray-200 py-2 mb-8 rounded-md">Sell Your Car</p>
          <Input name="make" value={carData.make} placeholder="Honda" handleChange={handleChange} />
          <Input name="model" value={carData.model} placeholder="Civic" handleChange={handleChange} />
          <Input name="color" value={carData.color} placeholder="Green" handleChange={handleChange} />
          <Input name="year" value={carData.year} type="number" placeholder="2008" handleChange={handleChange} />
          <Input name="mileage" value={carData.mileage} type="number" placeholder="0" handleChange={handleChange} />
          <Input name="price" value={carData.price} type="number" placeholder="$8000" handleChange={handleChange} />
          <div>
            <Input name="condition" value={carData.condition} inputType="select" handleChange={handleChange} />
            <input type="file" name="image" value={carData.image} onChange={(e) => setImage(e.target.files[0])} />
            {/* <Input name="image" value={carData.image} handleChange={handleChange} /> */}
          </div>
          <Input name="description" value={carData.description} inputType="textarea" handleChange={handleChange} />
          <div className="flex col-span-2 justify-end">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarsSales;
