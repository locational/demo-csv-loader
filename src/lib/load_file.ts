import { Result } from '../lib/types';
import Papa, { ParseConfig } from 'papaparse'

function hasKey<O>(obj: O, key: keyof any,): key is keyof O {
    return key in obj
}


export function change_key(key:string,old_key:string,data:null|undefined|JSON[]){
  
    if(key && data){
       const newAarray = data.map((el:JSON)=>{
          
            console.log(old_key,hasKey(el,old_key))
            if(hasKey(el,old_key)){
               const obj = {[key]:el[old_key]}
               
               const spread_obj = {
                   ...el,
                   ...obj
               }

               delete spread_obj[old_key]
               console.log(spread_obj)
               return spread_obj;
            }


        })

        return newAarray;
    }

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

        reader.readAsBinaryString(file.target.files[0] as Blob);
    });
}



//All about validation the csv

function parse_raw_data(filename: string, raw_data: any): Result {


    let data: any;

    let errors: [];

    const ext = filename.split('.').slice(-1)[0] || '';
    const config: ParseConfig = {
         header: true,
        dynamicTyping: true
    }


    if (!['csv'].includes(ext)) {
        const msg = 'Cannot load from file with extension ' + ext;
        return {
            valid_csv: false,
            load_error_messages: [msg],
            data: null,
            meta:null,
            raw_data:raw_data,
        };
    }

    try {
        data = Papa.parse(raw_data, config);
        errors = data.errors;
    } catch (e) {
        console.error(e);
        const msg = 'Problem parsing CSV';
        return {
            valid_csv: false,
            load_error_messages: [msg],
            data: null,
            meta:data.meta,
            raw_data:raw_data
        };
    }



    if (errors.length > 0) {
        return {
            valid_csv: true,
            load_error_messages: [...errors],
            data: data.data,
            meta:data.meta,
            raw_data:raw_data
        };
    }
    
    return {
        valid_csv: true,
        load_error_messages: null,
        meta:data.meta,
        raw_data:raw_data,
        data,
        
    };
}


async function load_data_from_file(file: File): Promise<Result> {
    console.log(file);
    try {
        const file_content = await read_file_content(file);
        return parse_raw_data(file.target.files[0].name,file_content)
    } catch (e) {
        return {
            valid_csv: false,
            load_error_messages: [e.message],
            raw_data:null,
            data: null,
            meta:null
        };
    }
}


export { load_data_from_file };