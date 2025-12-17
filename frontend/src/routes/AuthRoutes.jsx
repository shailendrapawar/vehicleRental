import LoginPage from "../pages/authPages/Login";
import RegisterPage from "../pages/authPages/Register";

 export const AuthRoutes=[
    { path: "/auth/login", element: <LoginPage /> },
    { path: "/auth/register", element: <RegisterPage /> },
    { path: "/auth/profile", element: <RegisterPage /> }

]

