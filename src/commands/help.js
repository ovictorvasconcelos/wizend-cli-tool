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
        --update-dep <dir>          Update project dependencies in the specified directory.
        --help                      Display help for all commands.

    Options:
        -h, --help                  Show this help message and exit.

    Examples:
        cli-tool-wizend --create             Create a new project.
        cli-tool-wizend --start              Start the project.
        cli-tool-wizend --delete             Delete an existing project.
        cli-tool-wizend --link-to-github     Link the project to a GitHub repository.
        cli-tool-wizend --list-repos         List all local Git repositories.
        cli-tool-wizend --update-dep <dir>   Update project dependencies in the specified directory.

    For more information, visit: https://github.com/ovictorvasconcelos/wizend-cli-tool`);
}