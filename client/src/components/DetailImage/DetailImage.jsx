import React from 'react';

const DetailImage = ({ data }) => (
  <div className="w-full md:w-1/2 px-4 mb-10 md:mb-0 mr-4">
    <div className="relative">
      <img
        alt={data?.data?.make}
        className="w-full h-full  relative rounded-xl z-10"
        src={data?.data?.image.startsWith('upload') ? `${import.meta.env.VITE_BASE_URL}/${data?.data?.image}` : data?.data?.image}
      />
    </div>
  </div>
);

export default DetailImage;
