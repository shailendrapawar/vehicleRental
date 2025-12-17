import RootLayout from "../layouts/RootLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router"

import Landing from "../pages/landing/Landing";

import  {AuthRoutes}  from "./AuthRoutes.jsx";



// try to only import layout routes or single routes here
// for  mutiple routes related to a module, create a separate route file like AuthRoutes.jsx
const MainRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

        {/* ================ Landing Page ===================== */}
        <Route path="" element={<Landing />}></Route>


        {/* ======auth pages=============== */}
        {AuthRoutes.map(({path,element},index)=>(
            <Route key={index} path={path} element={element}></Route>
        ))}


        {/* ========admin routes to be added here=========*/}
        {/* <Route path="/admin" element={}></Route> */}


        {/*======owner routes to be added here===========*/}
        <Route path="/owner" element={<OwnerLayout />}>

        </Route>



        {/*======customer routes to be added here===========*/}
        {/* <Route path="/customer" element={}></Route> */}
    </Route>
))


export default MainRouter;