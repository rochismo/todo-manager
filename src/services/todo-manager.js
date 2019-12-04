const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const DEFAULT_FILE_NAME = "todos.json"
const template = require("./template");
const {createTodo, createFile} = require("./questions.js")
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

    static async check(folder) {
        if (!fs.existsSync(path.join(folder, DEFAULT_FILE_NAME))) {
            return inquirer.prompt(createFile)
        }
        return { create: null }
    }
}