// Thank you https://github.com/mobz/get-timezone-offset/

const locale = "en-US";
const usRegExp = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/;

const formatOptions = {
  timeZone: "UTC",
  hour12: false,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const utcF = new Intl.DateTimeFormat(locale, formatOptions);

function parseDate(dateStr) {
  const dateStrTemp = dateStr.replace(/[\u200E\u200F]/g, "");
  const dateA = usRegExp.exec(dateStrTemp);
  return [].slice.call(dateA, 1).map(Math.floor);
}

function diffMinutes(d1, d2) {
  let day = d1[1] - d2[1];
  const hour = d1[3] - d2[3];
  const min = d1[4] - d2[4];

  if (day > 15) day = -1;
  if (day < -15) day = 1;

  return 60 * (24 * day + hour) + min;
}

function isIe11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

module.exports = function getTimezoneOffset(tzStr, date) {
  if (!isIe11()) {
    formatOptions.timeZone = tzStr;
  }

  const locF = new Intl.DateTimeFormat(locale, formatOptions);

  return diffMinutes(
    parseDate(utcF.format(date)),
    parseDate(locF.format(date))
  );
};
