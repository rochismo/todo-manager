const chalk = require("chalk");
const colors = ["white", "yellow", "red"];
module.exports = class Logger {
    static log(message, severity, background) {
        const color = colors[severity];
        const data = chalk[background ? "white" : color](`${message}`) 

        const bg = background ? chalk.bgKeyword(color)(data) : data;
        console.log(bg)
    }
}