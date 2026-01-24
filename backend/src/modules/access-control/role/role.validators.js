import Joi from "joi"

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
        .items(Joi.string().regex(/^[a-z0-9_-]+:[a-z0-9_-]+$/i))
        .optional()
        .messages({
            "array.base": "Permissions must be an array",
            "string.pattern.base": "Each permission must be in format 'entity:action' (e.g., 'shop:create')"
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
        .items(Joi.string().regex(/^[a-z0-9_-]+:[a-z0-9_-]+$/i))
        .optional()
        .messages({
            "array.base": "Permissions must be an array",
            "string.pattern.base": "Each permission must be in format 'entity:action' (e.g., 'shop:create')"
        }),

    isActive: Joi.boolean()
        .optional()
        .messages({
            "boolean.base": "isActive must be a boolean"
        })
}).unknown(false)