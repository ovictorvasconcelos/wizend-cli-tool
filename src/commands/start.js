import logger from "../logger.js";

const logMessage = logger('config:mgr');

export default function startCommand(config) {
    logMessage.highlight('🚀 Starting the App 🚀');
    logMessage.log('----------------------------------');
    logMessage.log('Received configuration:');
    logMessage.log(JSON.stringify(config, null, 0));
    logMessage.log('----------------------------------');
    logMessage.highlight('Initialization steps:');
    logMessage.log('- Setting up environment variables');
    logMessage.log(`- Starting the server on port`, config.port);
    logMessage.log('----------------------------------');
}   