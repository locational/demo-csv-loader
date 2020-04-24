import { RequiredField } from "../lib/types";

export function replace_keys(keys: RequiredField, raw_csv: string): string {
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
