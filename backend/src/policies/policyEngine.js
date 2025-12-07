import { type } from "os";
import {ShopPolicy} from "./shopPolicies.js";
import { VehiclePolicies } from "./vehiclePolicies.js";
import { VehicleApplicationPolicies } from "./vehicleApplicationPolicies.js";

const POLICIES = {
    shop: ShopPolicy,
    vehicle:VehiclePolicies,
    vehicleApplication:VehicleApplicationPolicies
}

function policyEngine(resource, user, action, data = null) {

    // # get policies related to resource, user,action
    const rolePolicy = POLICIES[resource]?.[user.role]?.[action];
    if (!rolePolicy) throw new Error(`Policy not found for ${user.role} on ${resource}.${action}`);


    //1: get query fro an action and user
    const query = typeof rolePolicy.query === "function" ? rolePolicy.query(user,data) : (rolePolicy.query || {})

    //2: get projection based for resource and action
    const projection = typeof rolePolicy.projections === "function" ? rolePolicy.projections(user,data) : (rolePolicy.projections ||"")


    // 3: allowed fields (for mutation)
    const allowedFields = typeof rolePolicy.allowedFields==="function"?rolePolicy.allowedFields(user,data): (rolePolicy.allowedFields||[])

    // 4: population fields ( for extra data)
    const populate=rolePolicy.populate||[]

    return {query,projection,allowedFields,populate}

}

export default policyEngine;