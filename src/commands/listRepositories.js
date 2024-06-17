import fs from "fs";
import path from "path";
import { promisify } from "util";
import logger from "../logger.js";
import { exec } from "child_process";

const execAsync = promisify(exec);
const statAsync = promisify(fs.stat);
const logMessage = logger('config:mgr');
const readDirAsync = promisify(fs.readdir);

async function isGitRepository(directory) {
    try {
        await execAsync('git rev-parse --is-inside-work-tree', { cwd: directory });
        return true;
    } catch (error) {
        return false;
    }
}

async function findGitRepositories(directory) {
    const subDirectories = await readDirAsync(directory);
    const results = await Promise.all(subDirectories.map(async (subDirectory) => {
        const response = path.resolve(directory, subDirectory);
        const status = await statAsync(response);

        if (status.isDirectory()) {
            if (await isGitRepository(response)) {
                return response;
            }
            return findGitRepositories(response);
        }
        return null;
    }));

    return results.flat().filter(Boolean);
}

export async function listRepositoriesCommand() {
    try {
        const currentDirectory = process.cwd();
        logMessage.highlight(`Searching for Git repositories in ${currentDirectory}...`);

        const repositories = await findGitRepositories(currentDirectory);

        if (repositories.length === 0) {
            logMessage.log(' ');
            logMessage.log('No Git repositories found.');
        } else {
            logMessage.log(' ');
            logMessage.highlight('Found Git repositories:');
            repositories.forEach(repo => logMessage.log(repo));
        }

    } catch (error) {
        logMessage.error('Failed to list local Git repositories: ', error);
    }
}