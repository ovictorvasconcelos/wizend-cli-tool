import logger from "../logger.js";

const logMessage = logger('config:mgr');

export default function helpCommand() {
    logMessage.log(`
    Usage: wizend [command] [options]
    
    Commands:
        --create                    Create a new project.
        --delete                    Delete an existing project.
        --start                     Start the project.
        --link-to-github            Link the project to a GitHub repository.
        --list-repos                List all local Git repositories.
        --help                      Display help for all commands.

    Options:
        -h, --help                  Show this help message and exit.

    Examples:
        wizend --create             Create a new project.
        wizend --start              Start the project.
        wizend --delete             Delete an existing project.
        wizend --link-to-github     Link the project to a GitHub repository.
        wizend --list-repos         List all local Git repositories.

    For more information, visit: https://github.com/ovictorvasconcelos/wizend-cli-tool`);
}