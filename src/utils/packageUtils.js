import path from "path";
import { promisify } from "util";
import logger from "../logger.js";
import { exec } from 'child_process';
import { readFileSync, writeFileSync } from "fs";

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

export function readPackageJson(projectDirectory) {
    const packagePath = path.join(projectDirectory, 'package.json');
    const packageContent = JSON.parse(readFileSync(packagePath, 'utf-8'));

    return packageContent;
}

export function writePackageJson(projectDirectory, packageContent) {
    const packagePath = path.join(projectDirectory, 'package.json');
    writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
}