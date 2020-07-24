export default function presence(obj) {
  if (obj === '' || obj === null || obj === undefined || obj === false) {
    return null;
  }

  return obj;
}
