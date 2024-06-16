import Ajv from "ajv";
import logger from "../logger.js";
import { cosmiconfigSync } from "cosmiconfig";
import betterAjvErrors from "better-ajv-errors";
import schema from "./schema.json" assert { type: 'json' };

const ajv = new Ajv();
const logMessage = logger('config:mgr');
const configLoader = cosmiconfigSync('tool');

export default function getUserConfig() {
    const resultConfig = configLoader.search(process.cwd());

    if (!resultConfig) {
        logMessage.error('Could not find configuration, using default');
        return { port: 8080, repository: "", author: "Unknown" };
    } else {
        const validate = ajv.compile(schema);
        const isValidConfig = validate(resultConfig.config);

        if (!isValidConfig) {
            logMessage.error('Invalid configuration was supplied');
            console.log();
            logMessage.error(betterAjvErrors(schema, resultConfig.config, validate.errors));
            process.exit(1);
        }

        logMessage.debug('Found configuration (package.json file)', resultConfig.config);
        return resultConfig.config;
    }
}