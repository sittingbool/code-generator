"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Configuration {
    constructor(configPath, configDirName = 'code_templates', configFileName = 'templates.json') {
        this.templatesPath = __dirname;
        this.configPath = __dirname;
        this.config = null;
        this.configPath = path.join(configPath, configDirName, configFileName);
        this.templatesPath = path.join(configPath, configDirName);
        this.loadConfig();
    }
    loadConfig() {
        try {
            this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        }
        catch (err) {
            console.error(err);
            this.config = null;
        }
    }
    configForComponent(component) {
        let config;
        if (!this.config) {
            return null;
        }
        config = this.config[component];
        if (config) {
            return config;
        }
        console.error('Could not find config for the component template named ' + component);
        return null;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map