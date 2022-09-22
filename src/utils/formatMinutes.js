const units = ["h", "k h", "M h"];

export default function formatMinutes(seconds) {
  if (isNaN(parseFloat(seconds)) || !isFinite(seconds)) {
    return "-";
  }

  if (seconds < 1) {
    return "0";
  }

  if (seconds < 60) {
    return `${seconds} s`;
  }

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} m`;
  }

  const num = Math.floor(seconds / 3600);
  const number = Math.floor(Math.log(num) / Math.log(1000));

  return `${(num / 1000 ** Math.floor(number)).toFixed(0)} ${units[number]}`;
}
