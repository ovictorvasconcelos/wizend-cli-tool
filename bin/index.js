#!/usr/bin/env node
import arg from "arg";
import logger from "../src/logger.js";
import { createCommand } from "../src/commands/create.js";
import { deleteCommand } from "../src/commands/delete.js";
import { listRepositoriesCommand } from "../src/commands/listRepositories.js";

const logMessage = logger('config:mgr');

try {
    const args = arg({
        '--create': Boolean,
        '--delete': Boolean,
        '--list-repos': Boolean
    });

    logMessage.debug('Received args', args);

    if (args['--create'])
        createCommand();

    if (args['--delete'])
        deleteCommand();

    if (args['--list-repos'])
        listRepositoriesCommand();

} catch (error) {
    logMessage.error(error.message);
    logMessage.log(' ');

    usageTool();
}

function usageTool() {
    logMessage.log(`Wizend [CMD]
    --create\t\tCreate a project
    --delete\t\tDelete a project
    --list-repos\tList local Git repositories`);
}