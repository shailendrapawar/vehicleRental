import mongoose from "mongoose";
import BaseService from "../base/base.service.js";
import UserModel from "./user.model.js";
import AppError from "../../utils/app-error.js"
import { USER_STATUS_TRANSITION_MAP, TERMINAL_STATUSES } from "../../constants/user.js"
import { canTransition } from "../../utils/statusTransition.js";
import bcrypt from "bcrypt";

class UserService extends BaseService {

    static UserTransitionMap = USER_STATUS_TRANSITION_MAP

    static populate = []

    static set = (model, entity, context) => {
        const log = context.logger;
        log.info(`processing ${Object.keys(model)?.length} fields, to update user: ${entity._id}`)

        if (model.name) {
            entity.name = model.name
        }

        if (model.email) {
            entity.email = model.email
        }

        if (model.dob) {
            entity.dob = model.dob
        }

        if (model.role) {
            entity.role = model.role
        }

        if (model.status) {
            if (!canTransition(entity.status, model.status, entity, this.UserTransitionMap)) {
                throw new AppError(`Entity's status cannot be changed from ${entity.status} to ${model.status}`)
            }
            entity.status = model.status
        }

        if (model.statusMessage) {
            entity.statusMessage = model.statusMessage
        }

        //for meta update
        if (model.meta) {
            entity.meta = entity.meta || {}
            Object.keys(model.meta).forEach((key, i) => {
                entity[key] = model[key]
            })
        }

        //TODO: later keep journal about changes for audit
        return entity;
    }

    static get = async (id, context, options = {}) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside GET service, with keyword:${id}`)

        let entity = null

        if (typeof (id) === "string") {
            log.silly(`Getting user with: ${id}`)
            if (mongoose.Types.ObjectId.isValid(id)) {
                entity = UserModel.findById(id);
            } else {
                entity = UserModel.findOne({ email: id.toLowerCase() });
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

        // 1: search by name
        if (query.name) {
            where.name = { $regex: query.name, $options: 'i' }
        }

        // 2: search by email
        if (query.email) {
            where.email = { $regex: query.email, $options: 'i' }
        }

        // 3: filter by role
        if (query.role) {
            where.role = query.role
        }

        // 4: filter by status
        if (query.status) {
            where.status = query.status
        }

        // 5: run query
        log.silly(`Searching for users with where=>${JSON.stringify(where)}`)
        const totalUsers = UserModel.countDocuments(where);
        const users = UserModel.find(where).sort(sort).skip(skip).limit(limit);

        const [total, items] = await Promise.all([totalUsers, users])

        log.info(`Found ${items.length} users for query ${JSON.stringify(where)}`)
        return { total, items, count: items.length }
    }

    static create = async (model, context, options = {}) => {
        const log = context.logger;

        // 1: Check if user with email already exists
        const existingUser = await this.get(model.email, context)
        if (existingUser) {
            log.warn(`User already exists with email: ${model.email}`)
            throw new AppError("User with this email already exists", 400, "Bad Request");
        }

        // 2: Hash password
        const hashedPassword = await bcrypt.hash(model.password, 10);

        // 3: Create new user entity
        const entity = new UserModel({
            name: model.name,
            email: model.email.toLowerCase(),
            password: hashedPassword,
            role: model.role || "customer",
            dob: model.dob || null
        })

        await entity.save()
        log.info(`User created successfully: ${entity._id}`)

        //TODO: from here hit an event with rabbitmq for email verification
        return entity;
    }

    static update = async (id, model = {}, context) => {
        if (!id) { return }
        const log = context.logger;
        log.silly(`Inside UPDATE service, with keyword:${id}`)

        let entity = await this.get(id, context, {});
        if (!entity) {
            log.warn(`No user found with: ${id}, returning back`)
            throw new AppError("No User found", 404, "RESOURCE_NOT_FOUND")
        }

        entity = await this.set(model, entity, context);
        await entity.save();

        // TODO: run any events with rabbit mq eg(status update: notify user)
        log.info(`User updated successfully: ${entity._id}`)
        return entity
    }
}

export default UserService