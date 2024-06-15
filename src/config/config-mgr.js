import logger from "../logger.js";
import { cosmiconfigSync } from "cosmiconfig";

const logMessage = logger('config:mgr');
const configLoader = cosmiconfigSync('tool');

export default function getUserConfig() {
    const resultConfig = configLoader.search(process.cwd());

    if (!resultConfig) {
        logMessage.error('Could not find configuration, using default');
        return { port: 8080 };
    } else {
        logMessage.debug('Found configuration (package.json file)', resultConfig.config);
        return resultConfig.config;
    }
}