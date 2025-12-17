import RootLayout from "../layouts/RootLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router"

import Landing from "../pages/landing/Landing";

import  {AuthRoutes}  from "./AuthRoutes.jsx";
import { OwnerRoutes } from "./OwnerRoutes.jsx";



// try to only import layout routes or single routes here
// for  mutiple routes related to a module, create a separate route file like AuthRoutes.jsx
const MainRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

        {/* LANDING PAGE ===================== */}
        <Route path="" element={<Landing />}></Route>


        {/*AUTH ROUTES=============== */}
        {AuthRoutes.map(({path,element},index)=>(
            <Route key={index} path={path} element={element}></Route>
        ))}


        {/*ADMIN ROUTES===============*/}
        {/* <Route path="/admin" element={}></Route> */}


        {/*OWNER ROUTES===============*/}
        <Route path="/owner" element={<OwnerLayout />}>
          {OwnerRoutes.map(({path,element},index)=>(
              <Route key={index} path={path} element={element}></Route>
          ))}

        </Route>



        {/*======customer routes to be added here===========*/}
        {/* <Route path="/customer" element={}></Route> */}
    </Route>
))


export default MainRouter;