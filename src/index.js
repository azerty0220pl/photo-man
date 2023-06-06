import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Store';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createHashRouter([
  {
    path: "/",
    element: null
  },
  {
    path: "/favourites/",
    element: null
  }
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
