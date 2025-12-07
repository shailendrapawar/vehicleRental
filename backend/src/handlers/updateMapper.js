/**
 * @async
 * @function update
 * @param {Object} allowedFields - Array of fields that are allowed to be updated.
 * @param {Object} entity - The original entity object to be updated.
 * @param {Object} model - The incoming model object containing new values.
 * @description This function maps the allowed fields from the incoming model to the original entity object.
 * @returns {Object} - Returns a JSON response indicating success or failure.
 */

import logger from "../utils/logger.js";


export const updateMapper = (allowedFields, entity, model) => {

    logger.info(`updateMapper called with entity id:- ${entity._id}`);

    //1: return if no model/data to update
    if (!model) {
        logger.silly("updateMapper called with no model/data to update, returning original entity");
        return {
            isSuccess: false,
            message: "No data to update",
            entity: entity
        }
    }

    //2: return  unmutated model if no allowed fields
    if (!allowedFields || allowedFields?.length === 0 || allowedFields === "") {
        logger.info("updateMapper called with no allowed fields, returning original entity");
        return {
            isSucces: false,
            message: "No data to update",
            entity: entity
        }
    }

    //3: convert allowed fields into array if string
    if (typeof allowedFields === 'string' && allowedFields?.length > 0) {
        allowedFields = allowedFields.split(" ");
    }

    logger.silly(`Updating ${entity._id} with allowedFields:- ${allowedFields}`);

    //4: loop through model fields and check if they are in allowed fields
    let updatedFields = [];
    for (const field of Object.keys(model)) {
        if (!allowedFields.includes(field)) {
            logger.warn(`updateMapper: update rejected for field:- ${field}`);
            return {
                isSuccess: false,
                message: `update rejected for field:- ${field}, you are not allowed to update this field`,
                entity: entity
            }
        }

        // double check again if it isnt prototype pollution,then insert into entity
        if (model.hasOwnProperty(field)) {
            entity[field] = model[field];
            updatedFields.push(field);
        }
    }

    logger.silly(`Update successful for fields:- ${updatedFields}, for entity :- ${entity._id}`);

    return {
        isSucces: true,
        message: "Update successful",
        entity
    }

}