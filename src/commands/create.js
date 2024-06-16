import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { promisify } from "util";
import logger from "../logger.js";
import getUserConfig from "../config/config-mgr.js";
import { createNextProject } from "../templates/nextProject.js";
import { createNodeProject } from "../templates/nodeProject.js";
import { createReactProject } from "../templates/reactProject.js";

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
            },
            {
                type: 'list',
                name: 'projectType',
                message: 'Select the type of project',
                choices: ["Node", "React", "Next"],
                default: "node"
            },
            {
                type: 'confirm',
                name: 'useTypeScript',
                message: 'Use Typescript?',
                default: false
            }
        ]);

        const userConfig = getUserConfig();
        const projectDirectory = path.join(process.cwd(), projectInfo.projectName);

        await makeDirAsync(projectDirectory);

        const readmeContent = `# ${projectInfo.projectName}\n\n${userConfig.description || ''}\n\nDeveloped by ${userConfig.author}\n\nProject Type: ${projectInfo.projectType}\nUse TypeScript: ${projectInfo.useTypeScript}`;

        await writeAsyncFile(
            path.join(projectDirectory, 'README.md'), readmeContent
        );

        logMessage.highlight(`Project '${projectInfo.projectName}' created successfully in '${projectDirectory}'`);

        switch (projectInfo.projectType) {
            case 'Node':
                await createNodeProject(projectDirectory, projectInfo.useTypeScript);
                break;
            case 'React':
                await createReactProject(projectDirectory, projectInfo.useTypeScript);
                break;
            case 'Next':
                await createNextProject(projectDirectory, projectInfo.useTypeScript);
                break;
            default:
                throw new Error(`Unknown project type: ${projectInfo.projectType}`);
        }

    } catch (error) {
        logMessage.error('Failed to create project: ', error);
    }
}