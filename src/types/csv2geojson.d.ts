// Type definitions for csv2geojson x.x
// Project: https://github.com/baz/foo (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: manqobasukati <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "csv2geojson" {
  export function auto(x: any): any;

  export function csv(text: any, f: any): any;

  export function csv2geojson(x: any, options: any, callback: any): any;

  export function guessLatHeader(row: any): any;

  export function guessLonHeader(row: any): any;

  export function isLat(f: any): any;

  export function isLon(f: any): any;

  export function toLine(gj: any): any;

  export function toPolygon(gj: any): any;

  export function tsv(text: any, f: any): any;

  export namespace dsv {
    function csvFormat(rows: any, columns: any): any;

    function csvFormatRows(rows: any): any;

    function csvParse(text: any, f: any): any;

    function csvParseRows(text: any, f: any): any;

    function dsvFormat(delimiter: any): any;

    function tsvFormat(rows: any, columns: any): any;

    function tsvFormatRows(rows: any): any;

    function tsvParse(text: any, f: any): any;

    function tsvParseRows(text: any, f: any): any;
  }
}
