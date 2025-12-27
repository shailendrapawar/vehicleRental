import Shops from "../pages/common/shops/Shops"
import SingleShop from "../pages/common/shops/SingleShop"
import CreateShop from "../pages/common/shops/CreateShop"

import Vehicles from "../pages/common/vehicles/Vehicles"
import SingleVehicle from "../pages/common/vehicles/SingleVehicle"
import AddVehicle from "../pages/common/vehicles/AddVehicle"
import Dashboard from "../pages/ownerPages/dashboard/Dashboard"

import { MdDashboard } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

import { FaUserCircle } from "react-icons/fa";
import ResourceNotFound from "../pages/common/resourceNotFound/ResourceNotFound"

const ROUTES = {

}

export const OwnerRoutes = [

  { path: "/owner/dashboard", element: <Dashboard /> },

  // shops routes

  { path: "/owner/shops", element: <Shops /> },
  { path: "/owner/shops/:id", element: <SingleShop /> },
  { path: "/owner/shops/add", element: <CreateShop /> },
  { path: "/owner/shops/resource-not-found", element: <ResourceNotFound /> },

  // vehicles routes
  { path: "/owner/vehicles", element: <Vehicles /> },
  { path: "/owner/vehicles/:id", element: <SingleVehicle /> },
  { path: "/owner/vehicles/add", element: <AddVehicle /> },

  // bookings
  { path: "/owner/bookings", element: <div /> },
  { path: "/owner/bookings/:id", element: <div /> },

]

let commonClass = "text-white text-2xl";

export const OwnerNavs = [

  {
    title: "Dashboard",
    icon: <MdDashboard className={` ${commonClass}`} />,
    path: "/owner/dashboard"
  },
  {
    title: "Shops",
    icon: <FaShop className={` ${commonClass}`} />,
    path: "/owner/shops"
  },
  {
    title: "Vehicles",
    icon: <FaCar className={` ${commonClass}`} />,
    path: "/owner/vehicles"
  },
  {
    title: "Bookings",
    icon: <FaMoneyCheckDollar className={` ${commonClass}`} />,
    path: "/owner/bookings"
  },
  // {
  //   title:"Support",
  //   icon:<MdOutlineSupportAgent className={` ${commonClass}`}/>,
  //   path:"/owner/support"
  // }

]