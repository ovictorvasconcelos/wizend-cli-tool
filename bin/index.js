#!/usr/bin/env node
import arg from "arg";

try {
    const args = arg({
        '--create': Boolean,
        '--config': Boolean,
    });

    if (args['--config'])
        console.log('Configure the app');

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