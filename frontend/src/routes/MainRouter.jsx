import RootLayout from "../layouts/RootLayout";

import { createBrowserRouter, createRoutesFromElements, Route} from "react-router"

const MainRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>

    </Route>
))


export default MainRouter;