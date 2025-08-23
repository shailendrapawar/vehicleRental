const roleRoutes = {
    customer: [
        { label: "Home", path: "/" },
        { label: "My Bookings", path: "/customer/bookings" },
        { label: "profile", path: "/" },
    ],
    owner: [
        { name: "Dashboard", path: "/owner/dashboard" },
        { name: "My Shops", path: "/owner/my-shops" },
        { name: "My Vehicles", path: "/owner/my-vehicles" },
        { name: "Bookings", path: "/owner/my-bookings" }
    ],

    admin: [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Users", path: "/admin/users" },
        { label: "Reports", path: "/admin/reports" },
    ],
}

export default roleRoutes;