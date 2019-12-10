const chalk = require("chalk");
const colors = ["white", "yellow", "red"];
module.exports = class Logger {
    static log(message, severity, background) {
        const color = colors[severity];
        let opposite = colors[(severity+1) % colors.length];
        if (!background) opposite = color;
        const display = chalk[opposite](`${background ? chalk.bgKeyword(color)(message) : message}`)
        console.log(display);
    }
}