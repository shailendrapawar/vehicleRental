export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = String(d.getFullYear()).slice(-2); // last 2 digits of year

  return `${day}-${month}-${year}`;
}
