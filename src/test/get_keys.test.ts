import { get_keys } from "../lib/get_keys";

test("basic matching", () => {
  const field = "latitude";
  const headers = ["latitude"];
  const expected = "latitude";
  const actual = get_keys(field, headers);
  expect(actual).toEqual(expected);
});

test("regex matching", () => {
  const field = "latitude";
  const headers = ["lat"];
  const expected = "lat";
  const actual = get_keys(field, headers);
  expect(actual).toEqual(expected);
});
