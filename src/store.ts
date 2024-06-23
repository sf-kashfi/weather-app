import { configureStore } from '@reduxjs/toolkit';
import { geolocationApi } from './services/geolocationApi';
import { weatherApi } from './services/weatherApi';

export const store = configureStore({
  reducer: {
    [geolocationApi.reducerPath]: geolocationApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geolocationApi.middleware, weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;