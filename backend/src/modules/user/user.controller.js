import BaseController from "../base/base.controller.js"
import logger from "../../utils/logger.js";
import { buildPagination } from "../../helpers/requestHelper.js"
import contextBuilder from "../../utils/contextBuilder.js"

import UserService from "./user.service.js"
import { createUserSchema, updateUserSchema } from "./user.validator.js"
import policyEngine from "../../policies/policyEngine.js"
import { responseMapper } from "../../handlers/responseMapper.js"

class UserController extends BaseController {

    static MODULE = "USER";

    static get = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:get module as ${context?.user?.role}`)

            if (!UserService.get) {
                throw new Error("Method not supported");
            }

            const user = await UserService.get(req.params.id, context, { lean: false, populate: true });

            if (!user) {
                return this.handleResponse(res, 404, `No user found with ${req?.params?.id}.`)
            }

            //handle with response mapper
            return this.handleResponse(res, 200, "User found", user)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static search = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:search module as ${context?.user?.role}`)

            if (!UserService.search) {
                throw new Error("Method not supported");
            }

            let options = {};
            options.pagination = buildPagination(req)

            const data = await UserService.search(req.query, context, options)

            return this.handleResponse(res, 200, "Users found", data);

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static create = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:create module as ${context?.user?.role}`)

            if (!UserService.create) {
                throw new Error("Method not supported");
            }

            //# VALIDATE body
            const { error, value } = createUserSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const data = await UserService.create(value, context);

            if (!data) {
                return this.handleError(res, 400, { message: "User creation failed, please try later" })
            }

            return this.handleResponse(res, 201, "User creation successful", data)
        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static update = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:update module as ${context?.user?.role}`)

            if (!UserService.update) {
                throw new Error("Method not supported");
            }

            const { error, value } = updateUserSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const data = await UserService.update(req.params.id, value, context)

            return this.handleResponse(res, 200, "User updated successfully", data)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }
}

export default UserController