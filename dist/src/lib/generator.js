"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const _s = require("underscore.string");
const inquirer = require("inquirer");
const mkdirp = require("mkdirp");
const _ = require("lodash");
const string_format_1 = require("./string-format");
class CodeGenerator {
    constructor(options) {
        this.files = [];
        this.templateAbsolutePath = null;
        this.defaultOptions = {
            showPrompt: true,
            wrapInFolder: true
        };
        this.options = {};
        this._callback = function (err) { if (err)
            throw new Error(err); };
        this.options = _.extend(this.defaultOptions, options);
        if (this.options.customTemplatesUrl.startsWith('/')) {
            this.templateAbsolutePath =
                path.join(this.options.customTemplatesUrl + '/' + this.options.templateName.toLowerCase());
        }
        else {
            this.templateAbsolutePath = path.join(__dirname, '../..', this.options.customTemplatesUrl + '/' + this.options.templateName.toLowerCase());
        }
        this.setupFormatter(this.options.componentName);
    }
    generate(callback) {
        if (typeof callback == 'function') {
            this._callback = callback;
        }
        if (this.options.customTemplatesUrl) {
            try {
                this.files = this.getFiles(this.templateAbsolutePath);
            }
            catch (err) {
                return this._callback(err.message);
            }
        }
        else {
            return this._callback('Specify the location of the templates ' +
                'folder using the customTemplatesUrl');
        }
        if (this.options.showPrompt) {
            inquirer.prompt([{
                    type: "confirm",
                    message: "Are you sure you want to create '" + this.options.componentName + "'?",
                    name: "confirmed",
                    default: true
                }], function (answers) {
                if (answers.confirmed) {
                    return this.finalize();
                }
                return false;
            });
        }
        else {
            return this.finalize();
        }
    }
    getFiles(dir, files_) {
        if (dir === undefined || !fs.existsSync(dir.toLowerCase())) {
            return [];
        }
        files_ = files_ || [];
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                this.getFiles(name, files_);
            }
            else {
                files_.push(name);
            }
        }
        return files_;
    }
    generateTemplate(templatePath) {
        let absoluteTemplatePath = path.resolve(templatePath);
        let dest = this.options.wrapInFolder ? this.options.componentName + "/" : "";
        if (this.options.dest) {
            dest = this.options.dest + "/" + dest;
        }
        return new Promise((resolve, reject) => {
            fs.readFile(absoluteTemplatePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err.message || 'unknown (1)');
                }
                let templateFilename = absoluteTemplatePath.replace(this.templateAbsolutePath + "/", "");
                let templatePathWithoutFileName = templateFilename.substring(0, templateFilename.lastIndexOf("/"));
                mkdirp(dest + templatePathWithoutFileName, () => {
                    let writeCb;
                    let destinationPath = dest + templateFilename.replace("{component}", this.options.componentName);
                    data = this.formatter.format(data);
                    writeCb = (err) => {
                        if (err) {
                            return reject(err.message || 'unknown (2)');
                        }
                        console.log('\x1b[32m%s\x1b[0m: ', "Created: " + destinationPath);
                        resolve(null);
                    };
                    fs.writeFile(destinationPath, data, writeCb);
                });
            });
        });
    }
    setupFormatter(replacement) {
        let variables = {
            "name": replacement,
            "Name": _s.classify(replacement)
        };
        this.formatter = new string_format_1.StringFormat(variables);
    }
    finalize() {
        let i, promises = [];
        if (this.files.length < 1) {
            console.log('nothing to create');
            return this._callback(null);
        }
        for (i = 0; i < this.files.length; i++) {
            promises.push(this.generateTemplate(this.files[i]));
        }
        Promise.all(promises).then(() => {
            this._callback(null);
        }).catch(err => {
            this._callback(err.message || 'unknown (3)');
        });
        return true;
    }
}
exports.CodeGenerator = CodeGenerator;
//# sourceMappingURL=generator.js.map