import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { MaterialUiProvider } from "./components/MaterialUiProvider";
import Weather from "./views/Weather/Weather";
import Root from "./routes/root";
import { Provider } from "react-redux";
import { store } from "./store";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MaterialUiProvider>
        <RouterProvider router={router} />
      </MaterialUiProvider>
    </Provider>
  </React.StrictMode>
);
