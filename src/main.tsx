import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { MaterialUiProvider } from './components/MaterialUiProvider';
import Weather from './views/Weather/Weather';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Weather />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MaterialUiProvider>
      <RouterProvider router={router} />
    </MaterialUiProvider>
  </React.StrictMode>,
)
