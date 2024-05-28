import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import './index.css'

function App() {

  function handleError(event: any) {
    if (event.message== 'ResizeObserver loop completed with undelivered notifications') {
      event.stopImmediatePropagation();
    }
  }
  
  window.addEventListener('error', handleError);
  return (
    <RouterProvider router={router} ></RouterProvider>
  );
}

export default App;
