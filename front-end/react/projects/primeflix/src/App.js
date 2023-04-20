import React from 'react';
import RoutesApp from './routes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <>
      <ToastContainer autoClose={3000}/>
      <RoutesApp />
    </>
  );
}

export default App;
