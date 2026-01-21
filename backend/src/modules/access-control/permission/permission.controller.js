import BaseController from "../../base/base.controller.js"
import logger from "../../../utils/logger.js";
import { buildPagination } from "../../../helpers/requestHelper.js"
import contextBuilder from "../../../utils/contextBuilder.js"


class PermissionController {

    static MODULE = "PERMISSION"

    static get = async (req, res) => {
        try {
            const context = contextBuilder(req);
            const log = context.logger;
            log.info(`USER: ${context?.user?._id} accessing ${this.MODULE}:get module as ${context?.user?.role}`)

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

        } catch (error) {
            logger.error(error)
            return this.handleError(res, 500, error)
        }
    }

}

export default PermissionController