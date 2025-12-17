import LoginPage from "../pages/common/authPages/Login";
import RegisterPage from "../pages/common/authPages/Register";

 export const AuthRoutes=[
    { path: "/auth/login", element: <LoginPage /> },
    { path: "/auth/register", element: <RegisterPage /> },
    { path: "/auth/profile", element: <RegisterPage /> }

]

