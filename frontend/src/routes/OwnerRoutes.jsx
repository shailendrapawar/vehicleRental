import Shops from "../pages/common/shops/Shops"
import SingleShop from "../pages/common/shops/SingleShop"
import CreateShop from "../pages/common/shops/CreateShop"

import Vehicles from "../pages/common/vehicles/Vehicles"
import SingleVehicle from "../pages/common/vehicles/SingleVehicle"
import AddVehicle from "../pages/common/vehicles/AddVehicle"

export const OwnerRoutes = [

  // shops routes
  { path: "/owner/shops", element: <Shops /> },
  { path: "/owner/shops/:id", element: <SingleShop /> },
  { path: "/owner/shops/add", element: <CreateShop /> },

  // vehicles routes
  { path: "/owner/vehicles", element: <Vehicles /> },
  { path: "/owner/vehicles/:id", element: <SingleVehicle /> },
  { path: "/owner/vehicles/add", element: <AddVehicle /> },

  //bookings
  // { path: "/owner/bookings", element: <AllVehicles /> },
  // { path: "/owner/bookings/:id", element: <AllVehicles /> },

]