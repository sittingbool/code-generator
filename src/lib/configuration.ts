/**
 * Created by richardhabermann on 20.04.17.
 */
//----------------------------------------------------------------------------------------------------------
import * as fs from 'fs';
import * as path from 'path';
//----------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
export interface IGeneratorRules
//----------------------------------------------------------------------------------------------------------
{
    [compoenent: string] : IGeneratorRule;
}


//----------------------------------------------------------------------------------------------------------
export interface IGeneratorRule
//----------------------------------------------------------------------------------------------------------
{
    showPrompt: false,
    dest: string;
}


//----------------------------------------------------------------------------------------------------------
export class Configuration
//----------------------------------------------------------------------------------------------------------
{
    //------------------------------------------------------------------------------------------------------
    templatesPath: string = __dirname;
    protected configPath: string = __dirname;
    protected config: IGeneratorRules = null;
    //------------------------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------------------------
    constructor( configPath: string,
                 configDirName:string = 'code_templates', configFileName = 'templates.json')
    //------------------------------------------------------------------------------------------------------
    {
        this.configPath = path.join(configPath, configDirName, configFileName);
        this.templatesPath = path.join(configPath, configDirName);
        this.loadConfig();
    }


    //------------------------------------------------------------------------------------------------------
    loadConfig()
    //------------------------------------------------------------------------------------------------------
    {
        try {
            this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        } catch(err) {
            console.error(err);
            this.config = null;
        }
    }


    //------------------------------------------------------------------------------------------------------
    configForComponent(component: string): IGeneratorRule
    //------------------------------------------------------------------------------------------------------
    {
        let config;

        if ( !this.config ) {
            return null;
        }

        config = this.config[component];
        if ( config ) {
            return config;
        }
        console.error('Could not find config for the component template named ' + component);
        return null;
    }
}