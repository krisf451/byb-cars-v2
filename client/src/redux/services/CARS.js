import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const user = JSON.parse(localStorage.getItem('user'));

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      if (user) {
        headers.set('authorization', `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (params) => {
        const paramsObj = {};
        for (const [key, value] of Object.entries(params)) {
          if (value) {
            paramsObj[key] = value;
          }
        }
        return {
          url: '/cars',
          method: 'GET',
          params: paramsObj,
        };
      },
      providesTags: ['Car'],
    }),
    getCarById: builder.query({
      query: (id) => `/cars/${id}`,
    }),
    getUserFavoriteCars: builder.query({
      query: () => '/cars/users/getFavorites',
    }),
    getCarMakes: builder.query({
      query: () => '/cars/makes',
    }),
    getCarModels: builder.query({
      query: () => '/cars/models',
    }),
    getCarColors: builder.query({
      query: () => '/cars/colors',
    }),
    addNewCar: builder.mutation({
      query: (payload) => ({
        url: '/cars',
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Car'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/cars/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Car'],
    }),
    toggleFavoriteCar: builder.mutation({
      query: ({ carId }) => ({
        url: '/cars/users/favorite',
        method: 'PUT',
        body: { carId },
      }),
    }),
  }),
});

export const {
  useToggleFavoriteCarMutation,
  useAddNewCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useGetCarColorsQuery,
  useGetCarMakesQuery,
  useGetCarModelsQuery,
  useGetUsersBoughtCarsQuery,
  useGetUsersSoldCarsQuery,
  useGetUsersCarsQuery,
  useGetUserFavoriteCarsQuery,
} = carsApi;
