import React from 'react';
import DetailButtonGroup from '../DetailButtonGroup/DetailButtonGroup';

const DetailDescription = ({ currentUser, data, capitalizeFirstLetter, usedOrNew, handleCheckout, handleDelete, setOpen }) => (
  <div className="w-full md:w-1/2 px-10 rounded">
    <div className="flex flex-row  justify-between">
      <h1 className="font-bold flex-initial  uppercase text-2xl mb-2">
        {capitalizeFirstLetter(data?.data?.make)} {data?.data?.model.toUpperCase()}
      </h1>
      <h1 className="font-medium text-2xl mr-2">
        {data?.data?.year}
      </h1>
    </div>

    <div className="relative py-4">
      <div className="absolute inset-0 left-12 flex items-center">
        <div className="w-full border-b border-gray-300" />
      </div>
      <div className="relative flex flex-start">
        <span className="bg-white dark:bg-transparent dark:text-white text-sm text-gray-500">Details</span>
      </div>
    </div>
    <details className="relative group my-4">
      <summary className="block">
        <div>
          <h2 className="text-lg font-bold mb-2">
            ${data?.data?.price.toFixed(2)}
          </h2>
          <p>{data?.data?.description}</p>
          <p className="mt-3"><strong>Owner:</strong> {data?.data?.ownerName}</p>
          <p><strong>Mileage:</strong> {data?.data?.mileage} miles</p>
          <p><strong>Condition of Car:</strong> {usedOrNew(data?.data?.isUsed)}</p>
          <p><strong>Color:</strong> {capitalizeFirstLetter(data?.data?.color)}</p>
          <p><strong>Status:</strong> {capitalizeFirstLetter(data?.data?.status || 'for sale')}</p>
        </div>
      </summary>
    </details>

    <div className="mb-1">
      {currentUser && (
        <DetailButtonGroup currentUser={currentUser} data={data} handleDelete={handleDelete} handleCheckout={handleCheckout} setOpen={setOpen} />
      )}
    </div>
  </div>
);

export default DetailDescription;
