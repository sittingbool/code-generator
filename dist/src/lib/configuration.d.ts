export interface IGeneratorRules {
    [compoenent: string]: IGeneratorRule;
}
export interface IGeneratorRule {
    showPrompt: false;
    dest: string;
}
export declare class Configuration {
    templatesPath: string;
    protected configPath: string;
    protected config: IGeneratorRules;
    constructor(configPath: string, configDirName?: string, configFileName?: string);
    loadConfig(): void;
    configForComponent(component: string): IGeneratorRule;
}
