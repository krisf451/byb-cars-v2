import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';

import { useGetCarByIdQuery, useDeleteCarMutation } from '../../redux/services/CARS';
import { capitalizeFirstLetter } from '../../components/Input/Input';
import getStripe from '../../utils/getStripe';
import DetailDescription from '../../components/DetailDescription/DetailDescription';
import DetailImage from '../../components/DetailImage/DetailImage';
import { UpdateCarModal } from '..';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useGetCarByIdQuery(id);
  const { currentUser } = useSelector((state) => state.auth);
  const [deleteCar] = useDeleteCarMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data?.data),
    });

    if (response.statusCode === 500) return;

    const result = await response.json();

    toast.loading('Redirecting...');
    axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/cars/${id}`, { purchasedBy: currentUser?._id, status: 'sold' }, {
      headers: {
        authorization: `Bearer ${currentUser?.token}`,
      },
    }).then((res) => console.log(res)).then(() => refetch()).catch((err) => console.log(err));

    await stripe.redirectToCheckout({ sessionId: result.id });
  };

  const handleDelete = () => {
    deleteCar(id)
      .then(() => {
        navigate('/explore');
      }).then(() => toast.success('Deleted Successfully'))
      .catch((err) => {
        console.log(err);
      });
  };

  const usedOrNew = (carCondition) => {
    const condition = carCondition === true ? 'used' : 'new';
    return condition;
  };

  return (
    <section className="min-w-screen min-h-screen bg-gradient-to-br from-gray-400 via-gray-600 to-blue-800 flex items-center p-5 lg:p-10 overflow-hidden relative rounded-lg">
      {data && (
        <div className="w-full max-w-6xl bg-white dark:bg-darkBg dark:text-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <DetailImage data={data} />

            <DetailDescription
              currentUser={currentUser}
              data={data}
              capitalizeFirstLetter={capitalizeFirstLetter}
              handleCheckout={handleCheckout}
              usedOrNew={usedOrNew}
              handleDelete={handleDelete}
              setOpen={setOpen}
            />
            <UpdateCarModal open={open} setOpen={setOpen} refetchDetails={refetch} />
          </div>
        </div>
      )}

    </section>

  );
};

export default CarDetails;
