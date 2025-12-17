

export const OwnerRoutes = [

  // shops routes
  { path: "/owner/shops", element: <AllShops /> },
  { path: "/owner/shops/:id", element: <AllShops /> },
  { path: "/owner/shops/add", element: <AllShops /> },

  // vehicles routes
  { path: "/owner/vehicles", element: <AllShops /> },
  { path: "/owner/vehicles/:id", element: <AllShops /> },
  { path: "/owner/vehicles/add", element: <AllShops /> },

  //vehicles
  { path: "/owner/bookings", element: <AllVehicles /> },
  { path: "/owner/bookings/:id", element: <AllVehicles /> },

]