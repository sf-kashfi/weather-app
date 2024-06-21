import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { MaterialUiProvider } from './components/MaterialUiProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MaterialUiProvider>
      <RouterProvider router={router} />
    </MaterialUiProvider>
  </React.StrictMode>,
)
