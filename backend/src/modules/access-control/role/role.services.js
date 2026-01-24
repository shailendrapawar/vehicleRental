import mongoose from "mongoose";
import BaseService from "../../base/base.service.js";
import RoleModel from "./role.model.js";
import AppError from "../../../utils/app-error.js";
import PermissionService from "../permission/permission.service.js";

export default class RoleService extends BaseService {

    static populate = [
        {
            path: "createdBy",
            select: "name email"
        },
        {
            path: "updatedBy",
            select: "name email"
        },
        {
            path: "permissions"
        }
    ]

    static set = (model, entity, context) => {
        const log = context.logger;
        log.info(`processing ${Object.keys(model)?.length} fields, to update role: ${entity._id}`)

        if (model.name) {
            entity.name = model.name
        }

        if (model.key) {
            entity.key = model.key.toLowerCase()
        }

        if (model.description) {
            entity.description = model.description
        }

        if (model.permissions && Array.isArray(model.permissions)) {
            entity.permissions = model.permissions.map(p => new mongoose.Types.ObjectId(p))
        }

        if (model.metadata) {
            entity.metadata = {
                ...entity.metadata,
                ...model.metadata
            }
        }

        if (model.isActive !== undefined) {
            entity.isActive = model.isActive
        }

        entity.updatedBy = new mongoose.Types.ObjectId(context.user?._id);

        return entity;
    }

    static get = async (id, context, options = {}) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside GET service, with keyword:${id}`)

        let entity = null

        if (typeof (id) === "string") {
            log.silly(`Getting role with: ${id}`)
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = RoleModel.findById(id);
            } else {
                entity = RoleModel.findOne({ key: id.toLowerCase() });
            }
        }

        if (entity) {
            log.info(`Resource found, processing it for options`)
            if (options.populate) {
                entity = entity.populate(this.populate)
            }
            if (options.lean) {
                entity = entity.lean();
            }
            entity = await entity
        }
        return entity
    }

    static search = async (query, context, options = {}) => {
        const log = context.logger;

        let where = {};
        let sort = {
            createdAt: -1
        }
        let { limit, skip } = options.pagination;

        if (query.key) {
            where.key = new RegExp(query.key, "i")
        }

        if (query.name) {
            where.name = new RegExp(query.name, "i")
        }

        if (query.isActive !== undefined) {
            where.isActive = query.isActive
        }

        if (query.isSystem !== undefined) {
            where.isSystem = query.isSystem
        }

        log.silly(`Searching for resource with, where=>${JSON.stringify(where)}`)
        const totalRoles = RoleModel.countDocuments(where);
        const roles = RoleModel.find(where).sort(sort).skip(skip).limit(limit).populate(this.populate);

        const [total, items] = await Promise.all([totalRoles, roles])

        log.info(`Found ${items.length} roles for query ${JSON.stringify(where)}`)
        return { total, items, count: items.length }
    }

    static create = async (model, context, options = {}) => {
        const { toObjectId, logger: log, user } = context;

        // Check if role with same key already exists
        const existingRole = await this.get(model.key, context)
        if (existingRole) {
            log.warn(`Role Already exists with key: ${model.key}, returning back...`)
            throw new AppError("Role Already exists with this key", 400, "Bad Request");
        }

        //normalise permissions
        let permissions = [];
        if (model?.permissions?.length > 0) {

            permissions = await getMappedPermissions(model.permissions, context)

            if (permissions.length === 0) {
                log.warn(`${result.length} permisisons exits with given paylod`)
                // throw new AppError("No given permissions exists in the system")
            }
        }

        // create entity
        const entity = new RoleModel({
            key: model.key.toLowerCase(),
            name: model.name,
            description: model.description,
            permissions: permissions || [],
            createdBy: toObjectId(user?._id),
            updatedBy: toObjectId(user?._id)
        })

        await entity.save()
        return entity;
    }

    static update = async (id, model = {}, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside UPDATE service, with keyword:${id}`)

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No role found with: ${id}, returning back`)
            throw new AppError("No Role found", 404, "RESOURCE_NOT_FOUND")
        }

        // Prevent system roles from being modified
        if (entity.isSystem) {
            log.warn(`Cannot update system role: ${id}`)
            throw new AppError("System roles cannot be modified", 400, "Bad Request")
        }

        entity = await this.set(model, entity, context);
        await entity.save();

        return entity
    }

    static delete = async (id, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside DELETE service, with keyword:${id}`)

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No role found with: ${id}, returning back`)
            throw new AppError("No Role found", 404, "RESOURCE_NOT_FOUND")
        }

        // Prevent system roles from being deleted
        if (entity.isSystem) {
            log.warn(`Cannot delete system role: ${id}`)
            throw new AppError("System roles cannot be deleted", 400, "Bad Request")
        }

        await RoleModel.findByIdAndDelete(id);
        return { message: "Role deleted successfully" }
    }
}

const getMappedPermissions = async (payload, context) => {

    let result = payload?.map((item) => {
        return PermissionService.get(item, context);
    })

    result = await Promise.allSettled(result)

    let permissions = result.map((item) => {
        if (item.status == "fulfilled") {
            return item?.value?._id
        }
    });

    return permissions || [];
}
