import { configureStore } from '@reduxjs/toolkit';
import { geolocationApi } from './services/geolocationApi';

export const store = configureStore({
  reducer: {
    [geolocationApi.reducerPath]: geolocationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geolocationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;