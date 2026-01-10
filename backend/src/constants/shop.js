
export const SHOP_STATUSES = ['draft', 'active', 'suspended', 'inactive']

export const OPERATIONAL_STATUSES = ['open', 'closed']

export const DEFAULT_SHOP_STATUS = "draft"
export const DEFAULT_OPERATION_STATUS = "closed"

export const TERMINAL_STATUSES = ["inactive"]

export const SHOP_STATUS_TRANSITION_MAP = {
    draft: ["active", "inactive"],
    active: ['suspended', 'inactive'],
    suspended: ['active', 'inactive'],
    inactive: []
}

