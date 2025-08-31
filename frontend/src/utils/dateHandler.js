export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = String(d.getFullYear()).slice(-2); // last 2 digits of year

  return `${day}-${month}-${year}`;
}


export  function normalizeDate(input) {
  let date;

  // If already a Date object
  if (input instanceof Date) {
    date = input;
  } 
  // If it's a number (timestamp in ms)
  else if (typeof input === "number") {
    date = new Date(input);
  } 
  // If it's a string (ISO or parseable)
  else if (typeof input === "string") {
    date = new Date(input);
  } 
  // Fallback for invalid types
  else {
    date = new Date();
  }

  // If date is invalid, return current time
  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}
