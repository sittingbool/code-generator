import * as rimraf from 'rimraf';
import * as path from 'path';

import { suite, test} from "mocha-typescript";
import { slow, timeout, skip, only } from "mocha-typescript";
import {CodeGenerator} from "../src/lib/generator"; // only for testing unconventional behaviour or single functions, see https://www.npmjs.com/package/mocha-typescript

@suite
class CodeGeneratorTest {

    before(done: Function) {
        rimraf(path.join(__dirname, 'test-output'), function(err) {
            if (err) { throw err; }
            console.log(' --> cleared test output');
            done()
        });
    }

    @test("generate files as shown in the template")
    assert_code_generation(done: Function) {
        let generator;
        let config = {
            showPrompt: false,
            componentName: "button",
            customTemplatesUrl: '../test-templates/',
            dest: 'test-output',
            templateName: 'component'
        };

        generator = new CodeGenerator(config);
        generator.generate((err) => {
            done(err);
        });
    }
}