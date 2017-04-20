export interface IGeneratorOptions {
    componentName?: string;
    templateName?: string;
    showPrompt?: boolean;
    wrapInFolder?: boolean;
    customTemplatesUrl?: string;
    dest?: string;
}
export declare class CodeGenerator {
    files: string[];
    templateAbsolutePath: string;
    defaultOptions: any;
    options: IGeneratorOptions;
    protected _callback: (err: string) => void;
    constructor(options: IGeneratorOptions);
    generate(callback?: (err: string) => never): true | void;
    getFiles(dir: string, files_?: string[]): string[];
    generateTemplate(templatePath: any): Promise<any>;
    finalize(): true | void;
}
