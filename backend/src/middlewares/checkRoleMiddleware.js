
export const checkRoleMiddleware = ([...allowedRoles]) => {

    return (req, res, next) => {

        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }

    }

}

