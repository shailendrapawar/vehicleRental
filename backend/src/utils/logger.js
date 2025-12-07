// logger.js
import chalk from "chalk";

const getTime = () => new Date().toISOString();
const logger = {

    start: (req) => {
        req._startTime = Date.now();
        console.log(
            chalk.bgBlue.cyanBright.bold(
                ` [START]: ${req.method} ${req.originalUrl} at ${new Date().toISOString()} `
            )
        );
    },

    end: (req, res, message = "Done", status = 200) => {
        const duration = Date.now() - (req._startTime || Date.now());
        const color = status >= 400 ? chalk.bgRed.white.bold : chalk.bgGreen.black.bold; // 🟢 success stands out

        console.log(color(` [END]: ${req.method} ${req.originalUrl} → ${message} (status: ${status}) in ${duration}ms`));
    },

    silly: (message) => {
        console.log(chalk.white(`[${getTime()}] [SILLY]: ${message}`));
    },

    info: (message) => {
        console.log(chalk.blue(`[${getTime()}] [INFO]: ${message}`));
    },

    warn: (message) => {
        console.log(chalk.yellow(`[${getTime()}] [WARN]: ${message}`));
    },

    success: (message) => {
        console.log(chalk.green(`[${getTime()}] [SUCCESS]: ${message}`));
    },

    error: (error) => {
        console.log(`START OF ERROR=========>`);
        console.log(chalk.red(`[${getTime()}] [ERROR]: (${error?.name?.toUpperCase() || "UNKOWN "})__(${error?.message || " ERROR MESSAGE"})`));
        console.error(chalk.red(`${JSON.stringify(error.stack)}`));
        console.log(`END OF ERROR==========>`);
    },

    debug: (message) => {
        console.log(chalk.hex("#ff00dd")(`[${getTime()}] [DEBUG]: ${message}`));
    },

    custom: (label, message, color = "white") => {
        const coloredLabel = chalk[color](`[${label.toUpperCase()}]`);
        console.log(`[${getTime()}] ${coloredLabel} ${message}`);
    }
};

export default logger;
