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
            }
        ]);
        
        const projectDirectory = path.join(process.cwd(), projectInfo.projectName);

        if (!fs.existsSync(projectDirectory)) {
            logMessage.error(`Project '${projectInfo.projectName}' does not exist in '${process.cwd()}'`);
            return;
        }

        await fsExtra.remove(projectDirectory);

        logMessage.highlight(`Project '${projectInfo.projectName}' deleted successfully from '${projectDirectory}'`);

    } catch (error) {
        logMessage.error('Failed to delete project: ', error);
    }
}