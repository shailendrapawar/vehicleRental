import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom"
import RootLayout from './RootLayout.jsx'


import Login from './pages/authPages/Login.jsx'
import Register from './pages/authPages/Register.jsx'

import CustomerLayout from './layouts/CustomerLayout.jsx'
import OwnerLayout from './layouts/OwnerLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'


const myRouter=createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<RootLayout/>}>
    {/*====commone routes========= */}
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>


    {/* =========Customer Routes================== */}
    <Route path='/customer' element={<CustomerLayout/>}>
    
    </Route>

     {/* =========Owner Routes================== */}
    <Route path='/owner' element={<OwnerLayout/>}>
    
    </Route>

     {/* =========Admin Routes================== */}
    <Route path='/admin' element={<AdminLayout/>}>
    
    </Route>



  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={myRouter}>

   </RouterProvider>
  </StrictMode>,
)
