/**
 * Created by richardhabermann on 19.04.17.
 */
import {CodeGenerator, IGeneratorOptions} from './lib/generator';
import * as program from 'commander';

program
    .version('0.0.1')
    .description('An application for pizzas ordering')
    .option('-c, --component [value]', 'Set class name')
    .option('-r, --rule [value]', 'Set generator rule')
    .option('-t, --target [value]', 'Set target directory')
    .parse(process.argv);

//var gen = new CodeGenerator(program.rule, { name: program.name, targetDir: program.target });
let options: IGeneratorOptions = {
    showPrompt: false,
    componentName: <string>program.component,
    customTemplatesUrl: '../test-templates/',
    dest: <string>program.component,
    templateName: <string>program.rule
};
let gen = new CodeGenerator(options);
gen.generate();