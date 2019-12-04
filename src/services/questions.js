module.exports = {
    createTodo: [{
        type: "input",
        message: "Enter the todo's title: ",
        name: 'title',
        validate(input) {
            return /^[\x00-\xFF]*$/.test(input) && !!input.trim();
        }
    },
    {
        type: "input",
        name: "body",
        message: "Enter the todo's body: ",
        validate(input) {
            return /^[\x00-\xFF]*$/.test(input) && !!input.trim();
        }
    },
    {
        type: "list",
        name: "severity",
        message: "Select the priority of the TODO",
        choices: [{
            name: "Low",
            value: 0
        },
        {
            name: "Medium",
            value: 1
        },
        {
            name: "High",
            value: 2
        }]
    }],
    createFile: [{
        type: "confirm",
        name: 'create',
        message: "There are no TODO's in that folder, do you want to create it?",
        default: true
    }]
}