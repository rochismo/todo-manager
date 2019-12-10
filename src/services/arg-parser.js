module.exports = class ArgumentParser {
    constructor(program) {
        this.add = program.add || false;
        this.folder = program.folder;
        this.list = program.list || false;
        this.mark = program.mark ? JSON.parse(program.mark) : null;
        this.change = program.change || null;
    }
}