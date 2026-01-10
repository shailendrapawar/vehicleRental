import AppError from "./app-error.js";
import logger from "./logger.js"
// import {}

export const canTransition = (from, to, entity, transitionMap) => {

    if (from == "" || to == "" || entity == "") {
        logger.warn("Either of arguments are null/missing:-(from, to, transitionMap)")
        return false
    }

    if (!transitionMap) {
        logger.warn("No transition map found")
        return false
    }

    if (from === to) {
        //already in same status
        logger.warn(`Already in ${to} status, returing back`)
        return false
    }

    if (!transitionMap[from].includes(to)) {
        // transiiton not allowed
        logger.warn(`Transition not allowed, for current status: ${from}`);
        return false
    }

    return true
}