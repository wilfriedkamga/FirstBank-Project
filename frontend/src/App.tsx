import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import './index.css'

function App() {
  return (
    <RouterProvider router={router} ></RouterProvider>

  );
}

export default App;
