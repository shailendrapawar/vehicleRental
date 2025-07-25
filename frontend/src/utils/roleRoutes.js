const roleRoutes = {
    customer: [
        { label: "Home", path: "/" },
        { label: "My Bookings", path: "/customer/bookings" },
        { label: "profile", path: "/" },
    ],
    owner: [
        { label: "Home", path: "/" },
        { label: "My Listing", path: "/owner/listings" },
        { label: "Add vehicle", path: "/owner/add-vehicle" },
    ],

    admin: [
        { label: "Dashboard", path: "/admin/dashboard" },
        { label: "Users", path: "/admin/users" },
        { label: "Reports", path: "/admin/reports" },
    ],
}

export default roleRoutes;