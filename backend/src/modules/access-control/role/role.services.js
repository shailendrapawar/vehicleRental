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
            path: "permissions",
            select: "key module isActive"
        }
    ]

    static set = async (model, entity, context) => {
        const { user, logger: log, toObjectId } = context;

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

        if (model.permissions && model.permissions.mode && model.permissions.values.length > 0) {
            await handlerPermissionUpdate(model, entity, context)
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

        entity.updatedBy = toObjectId(user?._id);
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
}

//get permisison from object id's
const getMappedPermissions = async (payload, context) => {
    // takes only string of permission
    const uniqueSet = new Set(payload);

    // transform uniqueSet=>array for iteration
    let result = [...uniqueSet]?.map((item) => {
        return PermissionService.get(item, context);
    })

    result = await Promise.allSettled(result)

    let permissions = result.filter((item) => {
        if (item.status == "fulfilled" && item.value) {
            return item?.value?._id
        }
    }).map((item) => item?.value?._id);

    return permissions || [];
}

//add or remove permisison form entity
const handlerPermissionUpdate = async (model, entity, context) => {
    const { logger: log } = context;
    const { mode, values } = model.permissions

    log.info(`tranforming permission for entity:${entity?._id} for MODE:${model?.permissions?.mode || "add"}`)
    const mappedPermissions = await getMappedPermissions(values, context);

    switch (mode) {
        case "add": {
            //convert exisiting permissions to string id(for better compare)
            const existingPerm = entity?.permissions?.map((item) => item.toString());
            //comvert incoming mapped-permission to string id(for better compare)
            const incomingPerm = mappedPermissions?.map((item) => item?.toString());

            //make unique set for all permission's object id
            const permSet = new Set([...existingPerm, ...incomingPerm]);
            //convert all string id back to object id
            const finalUniquePerm = [...permSet]?.map((item) => context?.toObjectId(item))

            log.debug(`Final permission setting to entity: ${JSON.stringify(finalUniquePerm)}`)
            //set  object id's to model's permissions field
            entity.permissions = finalUniquePerm;
            break;
        }

        case "remove": {

            //convert exisiting permissions to string id(for better compare)
            const existingPerm = entity?.permissions?.map((item) => item.toString());

            //comvert incoming mapped-permission to string id(for better compare)
            const incomingPerm = mappedPermissions?.map((item) => item?.toString());

            const filteredPerm = existingPerm.filter((item) => {
                if (!incomingPerm.includes(item)) {
                    return item
                }

            })?.map((item) => context.toObjectId(item))

            log.debug(`Final filtered permission setting to entity: ${JSON.stringify(filteredPerm)}`)
            entity.permissions = filteredPerm || []

            break;
        }

        default:
            context.logger.debug(`Invalid mode to tranform pemrission for entity:${entity._id}`)
            break;
    }
}
