const program = require("commander");
const ArgumentParser = require("./src/services/arg-parser"); 
const Manager = require('./src/services/todo-manager');

program
.option('-a, --add', 'Add a todo')
.option('-f, --folder <todo.json>', 'Specify a folder (Defaults to the current directory where the command is being run)', __dirname)
.option('-l, --list', 'Lists all TODOs on the current folder')
.option('-m, --mark <boolean>', 'Sets the status of a TODO')
.option('-c, --change <todo-id | title>', 'Modifies the TODO with the selected id')
.option('-s, --set-severity <1 | 2 | 3>', 'Change the severity')
.option('-h, --help', 'Prints all available options')
.parse(process.argv);

const parser = new ArgumentParser(program);
if (parser.add) {
    Manager.create(parser.folder);
}