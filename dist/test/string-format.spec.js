"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const should = require("should");
const string_format_1 = require("../src/lib/string-format");
let StringFormatTest = class StringFormatTest {
    assert_string_format_string() {
        let original, formatted, expected, variables, formatter;
        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 2 3 4 5 6 7';
        variables = {
            two: '2',
            five: '5',
            six: '6'
        };
        formatter = new string_format_1.StringFormat(variables);
        formatted = formatter.format(original);
        should(formatted).be.equal(expected);
    }
    assert_string_format_number() {
        let original, formatted, expected, variables, formatter;
        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 2 3 4 5 6 7';
        variables = {
            two: 2,
            five: 5,
            six: 6
        };
        formatter = new string_format_1.StringFormat(variables);
        formatted = formatter.format(original);
        should(formatted).be.equal(expected);
    }
    assert_string_format_bool() {
        let original, formatted, expected, variables, formatter;
        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 true 3 4 false true 7';
        variables = {
            two: true,
            five: false,
            six: true
        };
        formatter = new string_format_1.StringFormat(variables);
        formatted = formatter.format(original);
        should(formatted).be.equal(expected);
    }
    assert_string_format_mixed() {
        let original, formatted, expected, variables, formatter;
        original = '1 {two} 3 4 {five} {six} 7 {itsSuper}';
        expected = '1 2 3 4 5 false 7 true';
        variables = {
            two: '2',
            five: 5,
            six: false,
            itsSuper: true
        };
        formatter = new string_format_1.StringFormat(variables);
        formatted = formatter.format(original);
        should(formatted).be.equal(expected);
    }
};
__decorate([
    mocha_typescript_1.test("should replace string variables in string")
], StringFormatTest.prototype, "assert_string_format_string", null);
__decorate([
    mocha_typescript_1.test("should replace number variables in string")
], StringFormatTest.prototype, "assert_string_format_number", null);
__decorate([
    mocha_typescript_1.test("should replace bool variables in string")
], StringFormatTest.prototype, "assert_string_format_bool", null);
__decorate([
    mocha_typescript_1.test("should replace mixed variables in string")
], StringFormatTest.prototype, "assert_string_format_mixed", null);
StringFormatTest = __decorate([
    mocha_typescript_1.suite
], StringFormatTest);
//# sourceMappingURL=string-format.spec.js.map