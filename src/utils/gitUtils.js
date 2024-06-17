import { promisify } from "util";
import logger from "../logger.js";
import { exec } from "child_process";

const execAsync = promisify(exec);
const logMessage = logger('config:mgr');

const isValidGithubUrl = (url) => {
    const githubUrlRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+(?:\/)?\.git$/;

    return githubUrlRegex.test(url);
}

export async function linkGitRepository(projectDirectory, repositoryUrl) {
    if (!repositoryUrl) {
        logMessage.error('Repository URL not provided. Skipping linking to Git.');
        return;
    } else if (isValidGithubUrl(repositoryUrl) === false) {
        logMessage.error(`Invalid GitHub repository URL.\nPlease provide a valid GitHub repository URL in the format 'https://github.com/username/repository'.\nMake sure the URL is correct and try again.`);
    } else {
        await execAsync('git init', { cwd: projectDirectory });
        await execAsync(`git remote add origin ${repositoryUrl}`, { cwd: projectDirectory });
    
        logMessage.highlight(`Linked project to Git repository: ${repositoryUrl}`);
    }
}
