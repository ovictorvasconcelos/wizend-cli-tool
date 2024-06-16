#!/usr/bin/env node
import arg from "arg";
import startCommand from "../src/commands/start.js";
import getUserConfig from "../src/config/config-mgr.js";

try {
    const args = arg({
        '--start': Boolean,
        '--create': Boolean,
    });

    if (args['--start']) {
        const userConfig = getUserConfig();
        startCommand(userConfig);
    }

} catch (error) {
    console.log(error.message);
    console.log(' ');

    usageTool();
}

function usageTool() {
    console.log(`Wizend [CMD]
    --start\tStarts the app
    --create\tStarts the app`);
}