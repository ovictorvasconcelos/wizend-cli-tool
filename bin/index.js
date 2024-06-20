#!/usr/bin/env node
import arg from "arg";
import logger from "../src/logger.js";
import helpCommand from "../src/commands/help.js";
import { createCommand } from "../src/commands/create.js";
import { deleteCommand } from "../src/commands/delete.js";
import { linkCommand } from "../src/commands/linkRepository.js";
import { listRepositoriesCommand } from "../src/commands/listRepositories.js";

const logMessage = logger('config:mgr');

try {
    const args = arg({
        '--create': Boolean,
        '--delete': Boolean,
        '--link': Boolean,
        '--list-repos': Boolean,
        '--help': Boolean,
        '--h': Boolean,
    });

    logMessage.debug('Received args', args);

    if (args['--create'])
        createCommand();

    if (args['--delete'])
        deleteCommand();

    if (args['--link'])
        linkCommand();

    if (args['--list-repos'])
        listRepositoriesCommand();

    if (args['--help'] || args['--h'])
        helpCommand();

} catch (error) {
    logMessage.log(' ');
    logMessage.error(error.message);
    logMessage.log(' ');

    usageTool();
}

function usageTool() {
    logMessage.log(`Wizend [CMD]
    --create\t\tCreate a project
    --delete\t\tDelete a project
    --link\t\tLink to a Git repository
    --list-repos\tList local Git repositories`);
    logMessage.log(' ');
}