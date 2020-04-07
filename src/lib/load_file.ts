import { Result, RequiredField } from '../lib/types';
import Papa, { ParseConfig } from 'papaparse'

export function guess_value(field: string, headers: string[]): string {

    if (headers.includes(field)) {
        return headers.find(el => el === field) || '';
    }

    headers.map((el) => {
        return el.match(field.substr(0, 3))
    })
    const my_headers = headers.map((el) => {
        return el.match(field.substring(0, 3))
    }).filter((el) => { return el !== null })

    if (my_headers[0] && my_headers[0].input) {
        return my_headers[0].input
    }

    return field;

}

export function replace_keys(keys: RequiredField, raw_csv: string):string {
    let st: string | undefined;


    if (raw_csv?.match(keys.field as string)) {
        st = raw_csv;
    } else {
        st = raw_csv?.replace(keys.value as string, keys.field as string);
    }

    if (st) {
        return st;
    }

    return raw_csv;
}

export function read_file_content(file: File): Promise<string> {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject({ message: 'Missing file' });
        }
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const read_result = reader.result as string;

            return resolve(read_result);
        });

        reader.readAsBinaryString(file as Blob);
    });
}



//All about validation the csv

export function parse_raw_data(filename: string, raw_data: any): Result {
    let data: any;
    let errors: [];
    const ext = filename.split('.').slice(-1)[0] || '';
    const config: ParseConfig = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }


    if (!['csv'].includes(ext)) {
        const msg = 'Cannot load from file with extension ' + ext;
        return {
            valid_csv: false,
            load_error_messages: [msg],
            data: null,
            meta: null,
            raw_data: raw_data,
        };
    }

    try {
        data = Papa.parse(raw_data, config);
        errors = data.errors;
    } catch (e) {
        const msg = 'Problem parsing CSV';
        return {
            valid_csv: false,
            load_error_messages: [msg],
            data: null,
            meta: data.meta,
            raw_data: raw_data
        };
    }



    if (errors.length > 0) {
        return {
            valid_csv: true,
            load_error_messages: [...errors],
            data: data.data,
            meta: data.meta,
            raw_data: raw_data
        };
    }

    return {
        valid_csv: true,
        load_error_messages: null,
        meta: data.meta,
        raw_data: raw_data,
        data: data.data,

    };
}


async function load_data_from_file(file: File): Promise<Result> {

    try {
        const file_content = await read_file_content(file);
        return parse_raw_data(file.name, file_content)
    } catch (e) {
        return {
            valid_csv: false,
            load_error_messages: [e.message],
            raw_data: null,
            data: null,
            meta: null
        };
    }
}


export { load_data_from_file };