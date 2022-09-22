export default function apifyLabel(value) {
  const newValue = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)/g, "")
    .replace(/_([0-9]+)/g, "$1");

  return newValue;
}
