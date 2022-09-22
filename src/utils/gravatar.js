import md5 from "min-md5";
import queryString from "qs";
import generateColorMapper from "utils/generateColorMapper";

const colorForName = generateColorMapper([
  "F5C012",
  "83DD87",
  "00C7B7",
  "7E9DF2",
  "587CCC",
  "FF9750",
  "FC876D",
  "AB7ECE",
]);

const uriAvatar = ({
  size,
  name,
  background,
  color,
  length = 2,
  fontSize = 0.5,
  rounded = "false",
  uppercase = "true",
  bold = "true",
}) => {
  return `https://ui-avatars.com/api/${[
    name,
    size,
    background,
    color,
    length,
    fontSize,
    rounded,
    uppercase,
    bold,
  ].join("/")}`;
};

export default function gravatar(email, s, name = null) {
  const colorHash = colorForName(email);
  const initials =
    name &&
    name
      .trim()
      .split(/ +/)
      .reduce((acc, w) => acc + w[0].toUpperCase(), "")
      .slice(0, 2);

  const d = name
    ? uriAvatar({
        size: s * 3,
        fontSize: s < 40 ? 0.4 : 0.3,
        name: initials,
        background: colorHash,
        color: "ffffff",
      })
    : "blank";

  const url = `https://secure.gravatar.com/avatar/${md5(
    email
  )}?${queryString.stringify({ s: s * 2, d })}`;

  return url;
}
