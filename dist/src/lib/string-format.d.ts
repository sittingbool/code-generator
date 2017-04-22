export declare class StringFormat {
    protected variables: {
        [key: string]: string | number | boolean;
    };
    constructor(variables: {
        [key: string]: string | number | boolean;
    });
    format(data: string): string;
}
