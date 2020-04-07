import Papa from 'papaparse'

export interface ParseResult {
    valid_csv: boolean;
    load_error_messages: null | string[];
    data:string
  }

export interface RequiredField{
  field:null|string,
  value:null|string,
}
export interface Result {
    valid_csv: boolean;
    load_error_messages: null | string[],
    data:null|JSON[],
    meta:null,
    raw_data:null|string
}

//Algo stuff
export interface Algo {
  fn_name: string;
  docs_url?: string;
  title: string;
  intent: string;
  description?: string;
  fields?: null | AlgoField[];
  params?: null | AlgoRunParam[];
  return_fields: AlgoField[];
  remote: boolean;
  visualisations: VisualisationDefinition[];
}

export interface AlgoRunParam {
  name: string;
  required?: boolean; // Only required to set as true
  type: 'number' | 'string' | 'boolean' | 'array';
  default?: any;
}

export interface AlgoField {
  field_name: string;
  required?: boolean;
  value?:'string';
  type: 'string' | 'number' | 'date' | 'boolean';
}


export enum VisualisationMode {
  target = 'target',
  aggregation = 'aggregation',
}

export interface VisualisationDefinition { // DEFINE THE VIS IN CONFIG
  id: string;
  title: string;
  palette: string[];
  attribute?: AttributeDef; // No attribute --> just draw points/polys
  // Modes
  modes: {
    [VisualisationMode.target]?: TargetDef;
    [VisualisationMode.aggregation]?: AggregationDef;
  };
}

export enum AttributeType {
  boolean = 'boolean',
  category = 'category',
  continuous = 'continuous',
}

interface AttributeDef {
  field: string;
  type: AttributeType;
}

interface TargetDef {
  measure: string;
}

export interface AggregationDef {
  measure: string;
  function: NumericAggregationFunctionOptions;
}

export enum NumericAggregationFunctionOptions {
  sum = 'sum',
  count = 'count',
  mean = 'mean',
  max = 'max',
  min = 'min',
}

