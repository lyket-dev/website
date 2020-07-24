export default function intersperse(arr, sep, endSep = sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(
    (xs, x, i) => {
      return xs.concat([i === arr.length - 2 ? endSep : sep, x]);
    },
    [arr[0]],
  );
}
