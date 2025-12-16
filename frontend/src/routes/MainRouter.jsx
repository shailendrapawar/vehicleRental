import RootLayout from "../layouts/RootLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router"

import LoginPage from "../pages/authPages/Login";
import RegisterPage from "../pages/authPages/Register";
import Landing from "../pages/landing/Landing";


const MainRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>

        <Route path="" element={<Landing/>}></Route> 

    
        {/* ======auth pages=============== */}
        <Route path="login" element={<LoginPage/>}></Route>
        <Route path="register" element={<RegisterPage/>}></Route> 
        
        {/* ========admin routes to be added here=========*/}
        {/* <Route path="/owner" element={}></Route> */}


        {/*======owner routes to be added here===========*/}
        <Route path="/owner" element={<OwnerLayout/>}>
        
        </Route>



        {/*======customer routes to be added here===========*/}
        {/* <Route path="/customer" element={}></Route> */}
    </Route>
))


export default MainRouter;