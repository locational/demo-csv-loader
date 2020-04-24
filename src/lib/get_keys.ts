export function get_keys(field: string, headers: string[]): string {
  if (headers.includes(field)) {
    return headers.find(el => el === field) || "";
  }

  headers.map(el => {
    return el.match(field.substr(0, 3));
  });
  const my_headers = headers
    .map(el => {
      return el.match(field.substring(0, 3));
    })
    .filter(el => {
      return el !== null;
    });

  console.log(my_headers);

  if (my_headers[0] && my_headers[0].input) {
    return my_headers[0].input;
  }

  return field;
}
