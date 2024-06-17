import { promisify } from "util";
import logger from "../logger.js";
import { exec } from "child_process";

const execAsync = promisify(exec);
const logMessage = logger('config:mgr');

export async function runNpmInstall(directory) {
    try {
        logMessage.log(' ');
        logMessage.log('Running npm install...');
        await execAsync('npm install', { cwd: directory });
        logMessage.log(' ');
        logMessage.highlight('Dependencies successfully installed!');
    } catch (error) {
        logMessage.error(`Error executing the 'npm install' command: `, error);
    }
}