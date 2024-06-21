import { promisify } from "util";
import logger from "../logger.js";
import { exec } from 'child_process';

const execAsync = promisify(exec);
const logMessage = logger('config:mgr');

export async function getLatestVersion(packageName) {
    try {
        const { stdout } = await execAsync(`npm show ${packageName} version`);
        return stdout.trim();
    } catch (error) {
        logMessage.error(`Failed to get latest version for ${packageName}:`, error);
    }
}