import logger from "../logger.js";
import { exec } from "child_process";

const execAsync = promisify(exec);
const logMessage = logger('config:mgr');

export async function linkGitRepository(projectDirectory, repositoryUrl) {
    if (!repositoryUrl) {
        logMessage.error('Repository URL not provided. Skipping linking to Git.');
        return;
    }

    await execAsync('git init', { cwd: projectDirectory });
    await execAsync(`git remote add origin ${repositoryUrl}`, { cwd: projectDirectory });

    logMessage.highlight(`Linked project to Git repository: ${repositoryUrl}`);
}
