const units = ['calls', 'k', 'M'];

export default function formatCalls(num, precision = 0, showCalls = true) {
  if (isNaN(parseFloat(num)) || !isFinite(num)) {
    return '-';
  }

  if (num < 1) {
    return showCalls ? 'No calls' : '0';
  }

  if (num < 2) {
    return showCalls ? '1 call' : '1';
  }

  const number = Math.floor(Math.log(num) / Math.log(1000));
  const unit = number === 0 && !showCalls ? '' : units[number];

  return `${(num / 1000 ** Math.floor(number)).toFixed(precision)} ${unit}`;
}
