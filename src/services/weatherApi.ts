import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weatherapi.com/v1/' }),
  endpoints: (builder) => ({
    currentWeather: builder.query({
      query: ({ location }) => 
        `current.json?q=${location}&lang=En&key=4412009004de4d2481c204841242006`,
    }),
    forecastWeather: builder.query({
        query: ({ location }) => 
          `forecast.json?q=${location}&days=7&tp=24&key=4412009004de4d2481c204841242006`,
      }),
  }),
});

export const { useCurrentWeatherQuery, useForecastWeatherQuery } = weatherApi;