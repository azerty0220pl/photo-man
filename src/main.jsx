import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/Store';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from "react-router-dom";
import Search from './pages/search';
import Favourite from './pages/favourite';
import './css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createHashRouter([
  {
    path: "/",
    element: <Search />
  },
  {
    path: "/favourites/",
    element: <Favourite />
  }
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
