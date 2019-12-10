const fs = require("fs");
const path = require("path");
const Logger = require("./logger");
const inquirer = require("inquirer");
const DEFAULT_FILE_NAME = "todos.json"
const template = require("./template");
const {createTodo, createFile} = require("./questions.js");
const severities = require("./../severities")
module.exports = class Manager {
    static async create(folder) {
        const { create } = await Manager.check(folder);
        if (create === false) {
            return;
        } 
        if (create) {
            fs.writeFileSync(path.join(folder, DEFAULT_FILE_NAME), JSON.stringify(template, null, 2))
        }
        const { title, body, severity } = await inquirer.prompt(createTodo)
        const todos = require(path.join(folder, DEFAULT_FILE_NAME));
        const id = todos.lastId + 1;
        todos.lastId = id;
        todos.todos.push({
            id,
            title,
            body,
            severity,
            completed: false
        });
        fs.writeFileSync(path.join(folder, DEFAULT_FILE_NAME), JSON.stringify(todos, null, 2));
    }

    static exists(folder) {
        return fs.existsSync(path.join(folder, DEFAULT_FILE_NAME));
    }

    static list(folder) {
        if (!Manager.exists(folder)) {
            return Logger.log("There are no TODOS's here!", severities.HIGH, true);
        }
        const {todos} = require(path.join(folder, DEFAULT_FILE_NAME));
        todos.forEach(todo => {
            const done = todo.done ? "Completed" : "Not yet finished";
            const body = `TODO: ${todo.title} - ${todo.body} - ${done}`;
            Logger.log(body, todo.severity)
        })
    }

    static async check(folder) {
        if (!Manager.exists(folder)) {
            return inquirer.prompt(createFile)
        }
        return { create: null }
    }
}