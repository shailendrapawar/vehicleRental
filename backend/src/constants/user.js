
export const USER_ROLES = ["admin", "owner", "customer"]
export const DEFAULT_USER_ROLE = "customer"

export const USER_STATUSES = ['draft', 'active', 'suspended', 'inactive']

export const DEFAULT_USER_STATUS = "draft"

export const TERMINAL_STATUSES = ["inactive"]


export const USER_STATUS_TRANSITION_MAP = {
    draft: ["active", "inactive"],
    active: ['suspended', 'inactive'],
    suspended: ['active', 'inactive'],
    inactive: []
}

