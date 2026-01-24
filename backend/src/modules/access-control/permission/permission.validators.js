import Joi from "joi"
import { ROOT_MODULES } from "../../../constants/modules.js"
export const createPermissionSchema = Joi.object({
    key: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z]+:[a-z]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Key must be in format module:action, e.g., vehicle:update',
            'string.empty': 'Permission key is required'
        }),

    module: Joi.string()
        .trim()
        .valid(...ROOT_MODULES)
        .required()
        .messages({
            'string.empty': 'Module name is required'
        }),

    description: Joi.string()
        .trim()
        .optional()
        .allow('')
        .max(255)
        .messages({
            'string.max': 'Description cannot exceed 255 characters'
        }),
});


export const updatePermissionSchema = Joi.object({
    key: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z]+:[a-z]+$/)
        .optional()
        .messages({
            'string.pattern.base': 'Key must be in format module:action, e.g., vehicle:update'
        }),

    module: Joi.string()
        .trim()
        .valid(...ROOT_MODULES)
        .lowercase()
        .required()
        .messages({
            'any.only': "Invalid module",
            'string.empty': 'Module name is required'
        }),

    description: Joi.string()
        .trim()
        .optional()
        .allow('')
        .max(255)
        .messages({
            'string.max': 'Description cannot exceed 255 characters'
        }),

    isActive: Joi.boolean()
        .optional()
})

export const bulkCreatePermissionSchema = Joi.object({

    module: Joi.string()
        .trim()
        .valid(...ROOT_MODULES)
        .lowercase()
        .required()
        .messages({
            'any.only': "Invalid module",
            'string.empty': 'Module name is required',
        }),

    actions: Joi.array()
        .min(1)
        .required()

})
