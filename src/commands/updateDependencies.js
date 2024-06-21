import { promisify } from "util";
import logger from "../logger.js";
import { exec } from "child_process";
import { getLatestVersion, readPackageJson, writePackageJson } from "../utils/packageUtils.js";

const execAsync = promisify(exec);
const logMessage = logger('config:mgr');

export async function updateCommand(projectDirectory) {
    try {
        const packageContent = readPackageJson(projectDirectory);
        const dependenciesUpdate = [];

        logMessage.log(' ');
        logMessage.highlight('Checking for dependency updates...');

        for (const dependencies in packageContent.dependencies) {
            const currentVersion = packageContent.dependencies[dependencies];
            const latestVersion = await getLatestVersion(dependencies);

            if (latestVersion && latestVersion !== currentVersion) {
                packageContent.dependencies[dependencies] = latestVersion;
                dependenciesUpdate.push(`${dependencies}@${latestVersion}`);
            }
        }

        for (const dependencies in packageContent.devDependencies) {
            const currentVersion = packageContent.devDependencies[dependencies];
            const latestVersion = await getLatestVersion(dependencies);

            if (latestVersion && latestVersion !== currentVersion) {
                packageContent.devDependencies[dependencies] = latestVersion;
                dependenciesUpdate.push(`${dependencies}@${latestVersion}`);
            }
        }

        if (dependenciesUpdate.length > 0) {
            logMessage.log(' ');
            logMessage.log('Updating dependencies...');
            writePackageJson(projectDirectory, packageContent);

            logMessage.highlight('Running npm install to apply updates...');
            await execAsync(`cd ${projectDirectory} && npm install`);

            logMessage.log(' ');
            logMessage.highlight('Dependencies updated successfully!');
        } else {
            logMessage.log('All dependencies are already up to date.');
        }
    } catch (error) {
        logMessage.error('Failed to update dependencies: ', error);
    }
}