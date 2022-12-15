import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useGetCarByIdQuery, useUpdateCarMutation } from '../../redux/services/CARS';
import Input from '../../components/Input/Input';

export default function UpdateCarModal({ open, setOpen, refetchDetails }) {
  const { id } = useParams();
  const { data, refetch } = useGetCarByIdQuery(id);
  const [updateCar] = useUpdateCarMutation();

  const [carData, setCarData] = useState({ make: '', model: '', color: '', year: 0, mileage: 0, price: 0, condition: '', description: '' });

  useEffect(() => {
    setCarData({
      ...data?.data,
    });
    refetch();
  }, [id, data]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCar = {
      ...carData,
      isUsed: carData.condition === 'used',
    };

    updateCar({ id, ...updatedCar })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
    refetchDetails();
    toast.success('Car updated successfully.');
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div className="max-w-6xl mx-auto bg-white py-10">
                  <form onSubmit={handleSubmit} className="">
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                      <Input name="make" value={carData.make} placeholder="Honda" handleChange={handleChange} />
                      <Input name="model" value={carData.model} placeholder="Civic" handleChange={handleChange} />
                      <Input name="color" value={carData.color} placeholder="Green" handleChange={handleChange} />
                      <Input name="year" value={carData.year} type="number" placeholder="2008" handleChange={handleChange} />
                      <Input name="mileage" value={carData.mileage} type="number" placeholder="0" handleChange={handleChange} />
                      <Input name="price" value={carData.price} type="number" placeholder="$8000" handleChange={handleChange} />
                      <Input name="condition" value={carData.condition} inputType="select" handleChange={handleChange} />
                      <Input name="description" value={carData.description} inputType="textarea" handleChange={handleChange} />
                    </div>
                    <div className="flex justify-end">
                      <button onClick={() => setOpen(false)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">Go Back</button>
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
