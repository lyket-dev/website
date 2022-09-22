export default function generateColorMapper(colors) {
  return (name) =>
    colors[
      Array.from(name)
        .map((e) => e.charCodeAt(0))
        .reduce((acc, code) => acc + code) % colors.length
    ];
}
