import Joi from "joi"


const permissionString = Joi.string()
    .trim()
    .regex(/^[a-z0-9_-]+:[a-z0-9_-]+$/i)
    .messages({
        "string.pattern.base":
            "Permission must be in format 'entity:action' (e.g., 'shop:create')"
    });

const objectId = Joi.string()
    .hex()
    .length(24)
    .messages({
        "string.hex": "Permission id must be a valid ObjectId",
        "string.length": "Permission id must be a 24 character ObjectId"

    });


export const createRoleSchema = Joi.object({

    key: Joi.string()
        .trim()
        .lowercase()
        .alphanum()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.base": "Role key must be a string",
            "string.empty": "Role key is required",
            "string.alphanum": "Role key must contain only alphanumeric characters",
            "string.min": "Role key must be at least 2 characters",
            "string.max": "Role key cannot exceed 50 characters"
        }),

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "Role name must be a string",
            "string.empty": "Role name is required",
            "string.min": "Role name must be at least 2 characters",
            "string.max": "Role name cannot exceed 100 characters"
        }),

    description: Joi.string()
        .trim()
        .min(5)
        .max(500)
        .optional()
        .messages({
            "string.base": "Description must be a string",
            "string.min": "Description must be at least 5 characters",
            "string.max": "Description cannot exceed 500 characters"
        }),

    permissions: Joi.array()
        .items(
            Joi.alternatives().try(
                permissionString,
                objectId
            )
        )
        .optional()
        .messages({
            "array.base": "Permissions must be an array"
        }),

    metadata: Joi.object()
        .optional()
        .messages({
            "object.base": "Metadata must be an object"
        }),

}).unknown(false)

export const updateRoleSchema = Joi.object({
    key: Joi.string()
        .trim()
        .lowercase()
        .alphanum()
        .min(2)
        .max(50)
        .optional()
        .messages({
            "string.base": "Role key must be a string",
            "string.alphanum": "Role key must contain only alphanumeric characters",
            "string.min": "Role key must be at least 2 characters",
            "string.max": "Role key cannot exceed 50 characters"
        }),

    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional()
        .messages({
            "string.base": "Role name must be a string",
            "string.min": "Role name must be at least 2 characters",
            "string.max": "Role name cannot exceed 100 characters"
        }),

    description: Joi.string()
        .trim()
        .min(5)
        .max(500)
        .optional()
        .messages({
            "string.base": "Description must be a string",
            "string.min": "Description must be at least 5 characters",
            "string.max": "Description cannot exceed 500 characters"
        }),

    permissions: Joi.array()
        .items(
            Joi.alternatives().try(
                permissionString,
                objectId
            )
        )
        .optional()
        .messages({
            "array.base": "Permissions must be an array"
        }),

    isActive: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "isActive must be a boolean"
        })
}).unknown(false)