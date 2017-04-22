"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sb_util_ts_1 = require("sb-util-ts");
class StringFormat {
    constructor(variables) {
        this.variables = variables;
    }
    format(data) {
        if (!this.variables) {
            return data;
        }
        Object.keys(this.variables).forEach(key => {
            let variable = '{' + key + '}';
            let value = this.variables[key];
            switch (typeof value) {
                case 'boolean':
                case 'number':
                    value = JSON.stringify(value);
                    break;
                default:
                    break;
            }
            if (sb_util_ts_1.stringIsEmpty(value)) {
                return;
            }
            data = data.replace(new RegExp(variable, 'g'), value);
        });
        return data;
    }
}
exports.StringFormat = StringFormat;
//# sourceMappingURL=string-format.js.map