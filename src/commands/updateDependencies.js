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

        writePackageJson(projectDirectory, packageContent);

        if (dependenciesUpdate.length > 0)
            await execAsync(`cd ${projectDirectory} && npm install`);

        logMessage.log(' ');
        logMessage.highlight('Dependencies updated successfully!');
    } catch (error) {
        logMessage.error('Failed to update dependencies: ', error);
    }
}