export default function isNumeric(value) {
  const n = ~~Number(value);
  return String(n) === String(value);
}
