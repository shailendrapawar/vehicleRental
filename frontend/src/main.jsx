import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast"

import { RouterProvider } from "react-router"
import MainRouter from './routes/MainRouter.jsx'


import { Provider } from "react-redux"
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import ShopSetupPage from './pages/ShopSetup.jsx'
import RegisterPage from './pages/authPages/Register.jsx'
import LoginPage from './pages/authPages/Login'

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  //  <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <Toaster />
  //       <RouterProvider router={MainRouter}>

  //       </RouterProvider>

  //     </PersistGate>
  //   </Provider>

  // </StrictMode>
  <div className='min-h-screen bg-white'>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />

      {/* <Auth /> */}
      {/* <Landing /> */}
      {/* <LoginPage /> */}
      <RegisterPage />
      {/* <LoginPage /> */}
      {/* <ShopSetupPage /> */}
    </Provider>

  </div>
)
