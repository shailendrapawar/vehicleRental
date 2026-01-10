export const VEHICLE_TYPES = ["scooty", "bike", "car"]

export const VEHICLE_STATUSES = ['draft', 'active', 'suspended', 'inactive']
export const DEFAULT_VEHICLE_STATUS = "draft"

export const OPERATIONAL_STATUSES = ['available', 'booked', "maintainance"]
export const DEFAULT_OPERATION_STATUS = "available"

export const TERMINAL_STATUSES = ["inactive"]

export const SHOP_STATUS_TRANSITION_MAP = {
    draft: ["active", "inactive"],
    active: ['suspended', 'inactive'],
    suspended: ['active', 'inactive'],
    inactive: []
}
//==============================================

export const FUEL_TYPES = ["petrol", "diesel", "electric", "hybrid"]