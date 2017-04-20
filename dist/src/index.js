"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("./lib/generator");
const program = require("commander");
const sb_util_ts_1 = require("sb-util-ts");
const path = require("path");
const _ = require("lodash");
const configuration_1 = require("./lib/configuration");
const rootDir = path.join(__dirname, '..', '..');
const version = sb_util_ts_1.loadPackageInfo(rootDir, 'version');
let execDir = process.cwd();
let configuration, defaultConfig, config, generator, rule, component, error = false, templateSubDir = 'code_templates';
program
    .version(version || '0.0.1')
    .description('An application for creating files from templates')
    .option('-c, --component [value]', 'Set components name')
    .option('-r, --rule [value]', 'Set generator rule')
    .option('-t, --target [value]', 'Set target directory')
    .option('-d, --directory [value]', 'path to the template directory')
    .parse(process.argv);
rule = program.rule;
component = program.component;
if (sb_util_ts_1.stringIsEmpty(rule)) {
    console.error('Please give a rule naming the template and it configuration!');
    error = true;
}
if (sb_util_ts_1.stringIsEmpty(component)) {
    console.error('Please give a name for the component to be generated!');
    error = true;
}
if (!sb_util_ts_1.stringIsEmpty(program.directory)) {
    if (program.directory.charAt(0) !== '/') {
        execDir = path.join(execDir, program.directory);
    }
    else {
        execDir = program.directory;
    }
    console.log('Using templates from ' + execDir);
    templateSubDir = '';
}
if (!error) {
    configuration = new configuration_1.Configuration(execDir, templateSubDir);
    defaultConfig = {
        showPrompt: false,
        componentName: program.component,
        customTemplatesUrl: configuration.templatesPath,
        dest: path.join(execDir, '..', 'generated_files', program.component),
        templateName: program.rule
    };
    config = configuration.configForComponent(program.rule);
    if (config) {
        config = _.extend(defaultConfig, config);
    }
    else {
        config = defaultConfig;
    }
    generator = new generator_1.CodeGenerator(config);
    generator.generate();
}
//# sourceMappingURL=index.js.map