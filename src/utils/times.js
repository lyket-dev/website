export default function times(n) {
  /* eslint-disable prefer-spread */
  return Array.apply(null, { length: n }).map(Number.call, Number);
  /* eslint-enable prefer-spread */
}
