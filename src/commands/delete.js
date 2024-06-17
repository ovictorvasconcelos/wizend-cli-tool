import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import logger from "../logger.js";
import fsExtra from "fs-extra/esm";

const logMessage = logger('config:mgr');

export async function deleteCommand() {
    try {
        const projectInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Project Name (Delete)',
                validate: (input) => !!input.trim() || "Project name cannot be empty",
            },
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: `do you really want to delete this project?`,
                default: false
            }
        ]);
        
        const projectDirectory = path.join(process.cwd(), projectInfo.projectName);

        if (!fs.existsSync(projectDirectory)) {
            logMessage.error(`Project '${projectInfo.projectName}' does not exist in '${process.cwd()}'`);
            return;
        } else {
            if (projectInfo.confirmDelete === true) {
                await fsExtra.remove(projectDirectory);

                logMessage.log(' ');
                logMessage.highlight(`Project '${projectInfo.projectName}' deleted successfully from '${projectDirectory}'`);
            } else {
                logMessage.log(' ');
                logMessage.warning('The operation was cancelled by the user');
            }
        }

    } catch (error) {
        logMessage.error('Failed to delete project: ', error);
    }
}