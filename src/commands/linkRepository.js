import path from "path";
import inquirer from "inquirer";
import logger from "../logger.js";
import { linkGitRepository } from "../utils/gitUtils.js";

const logMessage = logger('config:mgr');

export async function linkCommand() {
    try {
        const projectInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Project Name',
                validate: (input) => !!input.trim() || "Project name cannot be empty",
                default: 'project-name',
            },
            {
                type: 'input',
                name: 'repositoryUrl',
                message: 'Git Repository URL'
            }
        ]);
        const projectDirectory = path.join(process.cwd(), projectInfo.projectName);

        await linkGitRepository(projectDirectory, projectInfo.repositoryUrl);

    } catch (error) {
        logMessage.error('Fails to link the project to a git repository: ', error);
    }
}