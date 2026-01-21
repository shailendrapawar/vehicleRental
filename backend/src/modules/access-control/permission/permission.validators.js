import Joi from "joi"

const createPermissionSchema = Joi.object({
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

    isActive: Joi.boolean()
        .optional()
});


const updatePermissionSchema = Joi.object({
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
        .optional(),

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
// .min(1) // At least one field must be provided to update
// .messages({
//     'object.min': 'At least one field must be provided for update'
// });
