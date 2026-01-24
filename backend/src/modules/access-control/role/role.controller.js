import BaseController from "../../base/base.controller.js"
import logger from "../../../utils/logger.js";
import { buildPagination } from "../../../helpers/requestHelper.js"
import contextBuilder from "../../../utils/contextBuilder.js"

import RoleService from "./role.services.js"
import { createRoleSchema, updateRoleSchema } from "./role.validators.js"
import policyEngine from "../../../policies/policyEngine.js"
import { responseMapper } from "../../../handlers/responseMapper.js"

class RoleController extends BaseController {

    static MODULE = "ROLE";

    static get = async (req, res) => {
        try {
            let context = contextBuilder(req)
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:get module as ${context?.user?.role}`)

            if (!RoleService.get) {
                throw new Error("Method not supported");
            }

            const role = await RoleService.get(req.params.id, context, { lean: false, populate: true });

            if (!role) {
                return this.handleResponse(res, 404, `No role found with ${req?.params?.id}.`)
            }

            return this.handleResponse(res, 200, "Role found", role)
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

            if (!RoleService.search) {
                throw new Error("Method not supported");
            }

            let options = {};
            options.pagination = buildPagination(req)

            const data = await RoleService.search(req.query, context, options)

            return this.handleResponse(res, 200, "Roles found", data);

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

            // #VALIDATE body
            const { error, value } = createRoleSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const data = await RoleService.create(value, context);

            if (!data) {
                return this.handleError(res, 400, { message: "Role creation failed, please try later" })
            }

            return this.handleResponse(res, 201, "Role creation successful", data)
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

            if (!RoleService.update) {
                throw new Error("Method not supported");
            }

            // #VALIDATE body
            const { error, value } = updateRoleSchema.validate(req.body)
            if (error) {
                log.error(error)
                return this.handleError(res, 400, error)
            }

            const data = await RoleService.update(req.params.id, value, context)

            return this.handleResponse(res, 200, "Role updated successfully", data)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

    static delete = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:delete module as ${context?.user?.role}`)

            if (!RoleService.delete) {
                throw new Error("Method not supported");
            }

            const data = await RoleService.delete(req.params.id, context)

            return this.handleResponse(res, 200, "Role deleted successfully", data)

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }
}

export default RoleController
