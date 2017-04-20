"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./lib/generator");
const program = require("commander");
program
    .version('0.0.1')
    .description('An application for pizzas ordering')
    .option('-c, --component [value]', 'Set class name')
    .option('-r, --rule [value]', 'Set generator rule')
    .option('-t, --target [value]', 'Set target directory')
    .parse(process.argv);
let options = {
    showPrompt: false,
    componentName: program.component,
    customTemplatesUrl: '../test-templates/',
    dest: program.component,
    templateName: program.rule
};
let gen = new generator_1.CodeGenerator(options);
gen.generate();
//# sourceMappingURL=index.js.map