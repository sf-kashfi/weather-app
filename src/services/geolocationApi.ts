import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geolocationApi = createApi({
  reducerPath: 'geolocationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    reverseGeocode: builder.query({
      query: ({ latitude, longitude }) => 
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    }),
    ipGeolocation: builder.query({
      query: () => 'https://ipapi.co/json/',
    }),
  }),
});

export const { useReverseGeocodeQuery, useIpGeolocationQuery } = geolocationApi;