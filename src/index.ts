/**
 * Created by richardhabermann on 19.04.17.
 */
import {CodeGenerator, IGeneratorOptions} from './lib/generator';
import * as program from 'commander';
import {loadPackageInfo, stringIsEmpty} from 'sb-util-ts';
import * as path from 'path';
import * as _ from 'lodash';
import {Configuration} from "./lib/configuration";

const rootDir = path.join(__dirname, '..', '..');
const version = loadPackageInfo(rootDir, 'version');

let execDir: string = process.cwd();

let configuration: Configuration,
    defaultConfig: IGeneratorOptions,
    config: IGeneratorOptions,
    generator: CodeGenerator,
    rule: string,
    component:string,
    error = false,
    templateSubDir: string = 'code_templates';

program
    .version(version || '0.0.1')
    .description('An application for creating files from templates')
    .option('-c, --component [value]', 'Set components name')
    .option('-r, --rule [value]', 'Set generator rule')
    .option('-t, --target [value]', 'Set target directory')
    .option('-d, --directory [value]', 'path to the template directory')
    .parse(process.argv);

rule = <string>program.rule;
component = <string>program.component;

if ( stringIsEmpty(rule) ) {
    console.error('Please give a rule naming the template and it configuration!');
    error = true;
}

if ( stringIsEmpty(component) ) {
    console.error('Please give a name for the component to be generated!');
    error = true;
}

if ( !stringIsEmpty(program.directory) ) {
    if ( <string>program.directory.charAt(0) !== '/' ) {
        execDir = path.join(execDir, <string>program.directory)
    } else {
        execDir = <string>program.directory;
    }
    console.log('Using templates from ' + execDir);
    templateSubDir = '';
}

if ( !error ) {
    configuration = new Configuration(execDir, templateSubDir);

    defaultConfig = {
        showPrompt: false,
        componentName: <string>program.component,
        customTemplatesUrl: configuration.templatesPath,
        dest: path.join(execDir, '..', 'generated_files', <string>program.component),
        templateName: <string>program.rule
    };

    config = configuration.configForComponent(<string>program.rule);

    if ( config ) {
        config = _.extend(defaultConfig, config);
    } else {
        config = defaultConfig;
    }

    if ( !stringIsEmpty(program.target) ) {
        config.dest = path.join(process.cwd(), program.target);
    }

    generator = new CodeGenerator(config);

    generator.generate();
}