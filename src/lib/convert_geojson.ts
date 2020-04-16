import csv2geojson from "csv2geojson";

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

export function get_numeric_fields(json: JSON): string {
  let numeric_fields = "";
  for (const j in json) {
    if (hasKey(json, j)) {
      if (typeof json[j] === "number") {
        numeric_fields += `${j},`;
      }
    }
  }

  return numeric_fields;
}
export async function convert2geojson(
  raw_csv: string,
  numeric_fields: string
): Promise<null | JSON> {
  let geojson: null | JSON = null;
  csv2geojson.csv2geojson(
    raw_csv,
    {
      numericFields: numeric_fields,
      delimiter: ","
    },
    function(err: any, data: JSON) {
      if (err) {
        return err;
      }

      geojson = data;
    }
  );

  if (geojson) {
    return geojson;
  }
  return null;
}
