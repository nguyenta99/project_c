import React from 'react'
import './index.css'
import AppProvider from './AppProvider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = (props) => {
  return (
    <div>
      <AppProvider
        {...props}
      />
      <ToastContainer
        theme='colored'
        position="bottom-right"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App