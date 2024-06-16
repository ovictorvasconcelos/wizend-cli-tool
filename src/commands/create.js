import fs, { mkdir } from "fs";
import path from "path";
import inquirer from "inquirer";
import { promisify } from "util";
import logger from "../logger.js";
import getUserConfig from "../config/config-mgr.js";

const logMessage = logger('config:mgr');
const makeDirAsync = promisify(fs.mkdir);
const writeAsyncFile = promisify(fs.writeFile);

export async function createCommand() {
    try {
        const projectInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Project Name',
                validate: (input) => !!input.trim() || "Project name cannot be empty",
            }
        ]);

        const userConfig = getUserConfig();
        const projectDirectory = path.join(process.cwd(), projectInfo.projectName);

        await makeDirAsync(projectDirectory);

        const readmeContent = `# ${projectInfo.projectName}\n\n${userConfig.description || ''}\n\nDeveloped 
        by ${userConfig.author}\n\nProject Type: ${userConfig.projectType}\nUse TypeScript: ${userConfig.useTypeScript}`;

        await writeAsyncFile(
            path.join(projectDirectory, 'README.md'), readmeContent
        );

        logMessage.highlight(`Project '${projectInfo.projectName}' created successfully in '${projectDirectory}'`);

    } catch (error) {
        logMessage.error('Failed to create project: ', error);
    }
}