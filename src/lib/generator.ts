//----------------------------------------------------------------------------------------------------------
import * as path from 'path';
import * as fs from 'fs';
import * as format from 'string-template';
import * as _s from 'underscore.string';
import * as inquirer from 'inquirer';
import * as mkdirp from 'mkdirp';
import * as _ from 'lodash';
//----------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------
export interface IGeneratorOptions
//----------------------------------------------------------------------------------------------------------
{

    componentName?: string;
    templateName?: string;
    showPrompt?: boolean;
    wrapInFolder?: boolean;
    customTemplatesUrl?: string;
    dest?: string;
}


//----------------------------------------------------------------------------------------------------------
export class CodeGenerator
//----------------------------------------------------------------------------------------------------------
{
    //------------------------------------------------------------------------------------------------------
    files: string[] = [];

    templateAbsolutePath: string = null;

    defaultOptions: any = {
        showPrompt: true,
        wrapInFolder: true
    };

    options: IGeneratorOptions = {};

    protected _callback = function(err: string) { if (err) throw new Error(err); };
    //------------------------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------------------------
    constructor(options: IGeneratorOptions)
    //------------------------------------------------------------------------------------------------------
    {
        this.options = _.extend(this.defaultOptions, options);
        this.templateAbsolutePath = path.join(__dirname, '../..',
            this.options.customTemplatesUrl + '/' + this.options.templateName.toLowerCase());
    }


    //------------------------------------------------------------------------------------------------------
    generate( callback?: (err: string) => never )
    //------------------------------------------------------------------------------------------------------
    {
        if ( typeof callback == 'function' ) {
            this._callback = callback;
        }
        // component template folder url
        if (this.options.customTemplatesUrl) {
            try {
                this.files = this.getFiles(this.templateAbsolutePath);
            } catch (err) {
                return this._callback(err.message);
            }
        } else {
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
        } else {
            return this.finalize();
        }
    }


    //------------------------------------------------------------------------------------------------------
    getFiles(dir: string, files_?: string[])
    //------------------------------------------------------------------------------------------------------
    {
        if (dir === undefined || !fs.existsSync(dir.toLowerCase())) {
            return [];
        }

        files_ = files_ || [];
        let files = fs.readdirSync(dir);

        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                this.getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }


    //------------------------------------------------------------------------------------------------------
    generateTemplate(templatePath): Promise<any>
    //------------------------------------------------------------------------------------------------------
    {
        let absoluteTemplatePath = path.resolve(templatePath);
        let dest = this.options.wrapInFolder ? this.options.componentName + "/" : "";

        // check if the file need a specific location
        if (this.options.dest) {
            dest = this.options.dest + "/" + dest;
        }

        return new Promise((resolve, reject) => {
            fs.readFile(absoluteTemplatePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err.message || 'unknown (1)');
                }

                let templateFilename = absoluteTemplatePath.replace(this.templateAbsolutePath + "/", "");
                let templatePathWithoutFileName =
                    templateFilename.substring(0, templateFilename.lastIndexOf("/"));


                mkdirp(dest + templatePathWithoutFileName, () => {
                    fs.writeFile(dest + templateFilename.replace("{component}",
                            this.options.componentName), format(data, {
                                name: this.options.componentName,
                                Name: _s.classify(this.options.componentName)
                            }),
                            (err) => {
                                if (err) {
                                    return reject(err.message || 'unknown (2)');
                                }
                                console.log('\x1b[32m%s\x1b[0m: ', "Created: " +
                                    dest + templateFilename.replace("{component}",
                                        this.options.componentName));
                                resolve(null);
                            });
                });
            });
        });
    }


    //------------------------------------------------------------------------------------------------------
    finalize()
    //------------------------------------------------------------------------------------------------------
    {
        // generate templates
        let i, promises: Promise<any>[] = [];
        if ( this.files.length < 1 ) {
            console.log('nothing to create');
            return this._callback(null);
        }
        for (i = 0; i < this.files.length; i++) {
            promises.push( this.generateTemplate(this.files[i]));
        }

        Promise.all(promises).then(() => {
            this._callback(null);
        }).catch(err => {
            this._callback(err.message || 'unknown (3)');
        });

        return true;
    }
}