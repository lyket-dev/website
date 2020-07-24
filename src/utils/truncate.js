export default function truncate(string, n = null) {
  if (!string || string.length === 0) {
    return '';
  }
  return n && string.length > n ? `${string.substr(0, n - 1)}…` : string;
}
