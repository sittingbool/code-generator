"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rimraf = require("rimraf");
const path = require("path");
const mocha_typescript_1 = require("mocha-typescript");
const generator_1 = require("../src/lib/generator");
let CodeGeneratorTest = class CodeGeneratorTest {
    before(done) {
        rimraf(path.join(__dirname, 'test-output'), function (err) {
            if (err) {
                throw err;
            }
            console.log(' --> cleared test output');
            done();
        });
    }
    assert_code_generation(done) {
        let generator;
        let config = {
            showPrompt: false,
            componentName: "button",
            customTemplatesUrl: '../test-templates/',
            dest: 'test-output',
            templateName: 'component'
        };
        generator = new generator_1.CodeGenerator(config);
        generator.generate((err) => {
            done(err);
        });
    }
};
__decorate([
    mocha_typescript_1.test("generate files as shown in the template")
], CodeGeneratorTest.prototype, "assert_code_generation", null);
CodeGeneratorTest = __decorate([
    mocha_typescript_1.suite
], CodeGeneratorTest);
//# sourceMappingURL=generate.spec.js.map