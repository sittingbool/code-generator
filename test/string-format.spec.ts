import { suite, test} from "mocha-typescript";
import { slow, timeout, skip, only } from "mocha-typescript"; // only for testing unconventional behaviour or single functions, see https://www.npmjs.com/package/mocha-typescript
import * as should from 'should';
import {StringFormat} from "../src/lib/string-format";

@suite
class StringFormatTest {

    @test("should replace string variables in string")
    assert_string_format_string() {
        let original, formatted, expected, variables, formatter;

        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 2 3 4 5 6 7';

        variables = {
            two: '2',
            five: '5',
            six: '6'
        };

        formatter = new StringFormat(variables);
        formatted = formatter.format(original);

        should(formatted).be.equal(expected);
    }

    @test("should replace number variables in string")
    assert_string_format_number() {
        let original, formatted, expected, variables, formatter;

        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 2 3 4 5 6 7';

        variables = {
            two: 2,
            five: 5,
            six: 6
        };

        formatter = new StringFormat(variables);
        formatted = formatter.format(original);

        should(formatted).be.equal(expected);
    }

    @test("should replace bool variables in string")
    assert_string_format_bool() {
        let original, formatted, expected, variables, formatter;

        original = '1 {two} 3 4 {five} {six} 7';
        expected = '1 true 3 4 false true 7';

        variables = {
            two: true,
            five: false,
            six: true
        };

        formatter = new StringFormat(variables);
        formatted = formatter.format(original);

        should(formatted).be.equal(expected);
    }

    @test("should replace mixed variables in string")
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

        formatter = new StringFormat(variables);
        formatted = formatter.format(original);

        should(formatted).be.equal(expected);
    }
}