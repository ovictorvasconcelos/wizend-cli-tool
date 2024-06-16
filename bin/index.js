#!/usr/bin/env node
import arg from "arg";
import getUserConfig from "../src/config/config-mgr.js";

try {
    const args = arg({
        '--create': Boolean,
        '--config': Boolean,
    });

    if (args['--config']) {
        const userConfig = getUserConfig();
        console.log(userConfig);
    }

} catch (error) {
    console.log(error.message);
    console.log(' ');

    usageTool();
}

function usageTool() {
    console.log(`Wizend [CMD]
    --create\tStarts the app
    --config\tSee app config`);
}