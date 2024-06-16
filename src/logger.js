import chalk from "chalk";
import debug from "debug";

export default function createLogger(name) {
    return {
        debug: debug(name),
        log: (...args) => console.log(chalk.gray(...args)),
        error: (...args) => console.log(chalk.red(...args)),
        warning: (...args) => console.log(chalk.yellow(...args)),
        highlight: (...args) => console.log(chalk.green(...args)),
    }
}