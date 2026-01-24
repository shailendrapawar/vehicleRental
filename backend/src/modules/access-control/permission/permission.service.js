import mongoose from "mongoose";
// import BaseService from "../base/base.service.js";
import PermissionModel from "./permission.model.js";
import AppError from "../../../utils/app-error.js";
import logger from "../../../utils/logger.js";

class PermissionService {

    static populate = []

    static set = (model, entity, context) => {
        const log = context.logger;
        log.info(`Processing ${Object.keys(model)?.length} fields to update permission: ${entity._id}`);

        if (model.key) {
            entity.key = model.key;
        }

        if (model.module) {
            entity.module = model.module;
        }

        if (model.description) {
            entity.description = model.description;
        }

        if (typeof model.isActive === 'boolean') {
            entity.isActive = model.isActive;
        }

        return entity;
    }

    static get = async (id, context, options = {}) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside GET service, with keyword: ${id}`);

        let entity = null;

        if (typeof id === "string") {
            log.silly(`Getting permission with: ${id}`);
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = PermissionModel.findById(id);
            } else {
                entity = PermissionModel.findOne({ key: id });
            }
        }

        if (entity) {
            log.info(`Resource found, processing it for options`);
            if (options.populate) {
                entity = entity.populate(this.populate);
            }
            if (options.lean) {
                entity = entity.lean();
            }
            entity = await entity;
        }
        return entity;
    }

    static search = async (query, context, options = {}) => {
        const log = context.logger;

        let where = {};
        let sort = { createdAt: -1 };
        let { limit = 10, skip = 0 } = options.pagination || {};

        // Filter by module
        if (query.module) {
            where.module = query.module;
        }

        // Filter by key
        if (query.key) {
            where.key = new RegExp(query.key, 'i');
        }

        // Filter by active status
        if (typeof query.isActive === 'boolean') {
            where.isActive = query.isActive;
        }

        log.silly(`Searching for permissions with where => ${JSON.stringify(where)}`);

        const totalPermissions = PermissionModel.countDocuments(where);
        const permissions = PermissionModel.find(where).sort(sort).skip(skip).limit(limit);

        const [total, items] = await Promise.all([totalPermissions, permissions]);

        log.info(`Found ${items.length} permissions for query ${JSON.stringify(where)}`);
        return { total, items, count: items.length };
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;

        // Check if permission already exists with same key
        const existingPermission = await this.get(model.key, context);
        if (existingPermission) {
            log.warn(`Permission already exists with key: ${model.key}, returning back...`);
            throw new AppError("Permission already exists with this key", 400, "Bad Request");

        }

        const entity = new PermissionModel({
            key: model.key,
            module: model.module,
            description: model.description || '',
            isActive: model.isActive !== false
        });

        await entity.save();
        log.info(`Permission created successfully with key: ${model.key}`);
        return entity;
    }

    static update = async (id, model = {}, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside UPDATE service, with keyword: ${id}`);

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No permission found with: ${id}, returning back`);
            throw new AppError("No Permission found", 404, "RESOURCE_NOT_FOUND");
        }

        entity = await this.set(model, entity, context);
        await entity.save();

        log.info(`Permission updated successfully: ${entity._id}`);
        return entity;
    }

    static bulkCreate = async (data, context) => {
        const log = context.logger;
        log.silly(`Inside BULK service, with payload: ${JSON.stringify(data)}`);

        let result = data?.actions?.map((action) => {
            const model = {
                key: `${data.module}:${action}`,
                module: data.module,
                description: ` Permission for ${action} of ${data.module}`
            }
            return this.create(model, context, {});
        })

        result = await Promise.allSettled(result);
        // console.log(result)
        log.debug(`BULK PERMISSION RESULT: ${JSON.stringify(result)}`)
        return result.filter((item) => item.status === "fulfilled")

    }


}

export default PermissionService