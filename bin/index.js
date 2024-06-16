#!/usr/bin/env node
import arg from "arg";
import logger from "../src/logger.js";
import startCommand from "../src/commands/start.js";
import getUserConfig from "../src/config/config-mgr.js";
import { createCommand } from "../src/commands/create.js";

const logMessage = logger('config:mgr');

try {
    const args = arg({
        '--start': Boolean,
        '--create': Boolean,
    });

    logMessage.debug('Received args', args);

    if (args['--start']) {
        const userConfig = getUserConfig();
        startCommand(userConfig);
    }

    if (args['--create'])
        createCommand();

} catch (error) {
    logMessage.error(error.message);
    logMessage.log(' ');

    usageTool();
}

function usageTool() {
    logMessage.log(`Wizend [CMD]
    --create\tCreate a project
    --start\tStarts the project`);
}