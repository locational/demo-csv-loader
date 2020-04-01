import Papa from 'papaparse'

export interface ParseResult {
    valid_csv: boolean;
    load_error_messages: null | string[];
    data:string
  }

export interface Result {
    valid_csv: boolean;
    load_error_messages: null | string[],
    data:null|JSON
}


