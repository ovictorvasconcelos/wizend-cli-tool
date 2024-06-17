import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { promisify } from "util";
import logger from "../logger.js";

const rmDirAsync = promisify(fs.rmdir);
const logMessage = logger('config:mgr');
const unlinkAsync = promisify(fs.unlink);
const readDirAsync = promisify(fs.readdir);

async function deleteFolderRecursive(directory) {
    if (fs.existsSync(directory)) {
        const files = await readDirAsync(directory);

        for (const file of files) {
            const currentPath = path.join(directory, file);

            if (fs.lstatSync(currentPath).isDirectory()) {
                await deleteFolderRecursive();
            } else {
                await unlinkAsync(currentPath);
            }
        }

        await rmDirAsync(directory);
    }
}

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

        await deleteFolderRecursive(projectDirectory);

        logMessage.highlight(`Project '${projectInfo.projectName}' deleted successfully from '${projectDirectory}'`);

    } catch (error) {
        logMessage.error('Failed to delete project: ', error);
    }
}