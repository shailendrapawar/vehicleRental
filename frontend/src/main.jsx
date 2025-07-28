import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import RootLayout from './RootLayout.jsx'


import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'

import CustomerLayout from './layouts/CustomerLayout.jsx'
import OwnerLayout from './layouts/OwnerLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Landing from './pages/landingPage/Landing.jsx'

import { Provider } from "react-redux"
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import { Toaster } from "react-hot-toast"
import Unauthorized from './pages/Unauthorized.jsx'
import Error from './pages/Error.jsx'
import OwnerDashboard from './pages/owner/OwnerDashboard.jsx'
import MyShops from './pages/owner/MyShops.jsx'
import MyVehicles from './pages/owner/MyVehicles.jsx'
import MyBookings from './pages/owner/MyBookings.jsx'

const myRouter = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<RootLayout />}>
    {/*====commone routes========= */}
    <Route index element={<Landing />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />


    {/* =========Admin Routes================== */}
    <Route path='/admin' element={<AdminLayout allowedRoles={["admin"]} />}>


    </Route>


    {/* =========Owner Routes================== */}
    <Route path='/owner' element={<OwnerLayout allowedRoles={["owner"]} />}>

      <Route path='/owner/' element={<Navigate to={'/owner/dashboard'}/>} />
      <Route path='/owner/dashboard' element={<OwnerDashboard />} />
      <Route path='/owner/my-shops' element={<MyShops />} />
      <Route path='/owner/my-vehicles' element={<MyVehicles />} />
      <Route path='/owner/my-bookings' element={<MyBookings />} />


    </Route>


    {/* =========Customer Routes================== */}
    <Route path='/customer' element={<CustomerLayout allowedRoles={["customer"]} />}>

    </Route>



    {/* ====== error or forbidden routes========== */}
    <Route path='/forbidden' element={<Unauthorized />} />
    <Route path='*' element={<Error />} />

  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouterProvider router={myRouter}>

        </RouterProvider>

      </PersistGate>
    </Provider>
  </StrictMode>,
)
