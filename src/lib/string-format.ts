//----------------------------------------------------------------------------------------------------------
import {type} from "os";
import {stringIsEmpty} from "sb-util-ts";
export class StringFormat
//----------------------------------------------------------------------------------------------------------
{
    //------------------------------------------------------------------------------------------------------
    constructor( protected variables: { [key: string] : string | number | boolean })
    //------------------------------------------------------------------------------------------------------
    {
    }


    //------------------------------------------------------------------------------------------------------
    format(data: string): string
    //------------------------------------------------------------------------------------------------------
    {
        if ( !this.variables ) { return data; }

        Object.keys(this.variables).forEach(key => {
            let variable = '{' + key + '}';
            let value = this.variables[key];

            // accept number or boolean, make a string out of it
            switch ( typeof value ) {
                case 'boolean':
                case 'number':
                    value = JSON.stringify(value);
                    break;

                default:
                    break;
            }

            if ( stringIsEmpty(value) ) {
                return; // not  a valid value
            }

            data = data.replace( new RegExp(variable, 'g'), value);
        });

        return data;
    }
}