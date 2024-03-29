import getTimezoneOffset from "./getTimezoneOffset";

/* eslint-disable quote-props */

const timezones = {
  Niue: "Pacific/Niue",
  "Pago Pago": "Pacific/Pago_Pago",
  "Hawaii Time": "Pacific/Honolulu",
  Rarotonga: "Pacific/Rarotonga",
  Tahiti: "Pacific/Tahiti",
  Marquesas: "Pacific/Marquesas",
  "Alaska Time": "America/Anchorage",
  Gambier: "Pacific/Gambier",
  "Pacific Time": "America/Los_Angeles",
  "Pacific Time - Tijuana": "America/Tijuana",
  "Pacific Time - Vancouver": "America/Vancouver",
  "Pacific Time - Whitehorse": "America/Whitehorse",
  Pitcairn: "Pacific/Pitcairn",
  "Mountain Time - Dawson Creek": "America/Dawson_Creek",
  "Mountain Time": "America/Denver",
  "Mountain Time - Edmonton": "America/Edmonton",
  "Mountain Time - Hermosillo": "America/Hermosillo",
  "Mountain Time - Chihuahua, Mazatlan": "America/Mazatlan",
  "Mountain Time - Arizona": "America/Phoenix",
  "Mountain Time - Yellowknife": "America/Yellowknife",
  Belize: "America/Belize",
  "Central Time": "America/Chicago",
  "Costa Rica": "America/Costa_Rica",
  "El Salvador": "America/El_Salvador",
  Guatemala: "America/Guatemala",
  Managua: "America/Managua",
  "Central Time - Mexico City": "America/Mexico_City",
  "Central Time - Regina": "America/Regina",
  "Central Time - Tegucigalpa": "America/Tegucigalpa",
  "Central Time - Winnipeg": "America/Winnipeg",
  Galapagos: "Pacific/Galapagos",
  Bogota: "America/Bogota",
  "America Cancun": "America/Cancun",
  Cayman: "America/Cayman",
  Guayaquil: "America/Guayaquil",
  Havana: "America/Havana",
  "Eastern Time - Iqaluit": "America/Iqaluit",
  Jamaica: "America/Jamaica",
  Lima: "America/Lima",
  Nassau: "America/Nassau",
  "Eastern Time": "America/New_York",
  Panama: "America/Panama",
  "Port-au-Prince": "America/Port-au-Prince",
  "Rio Branco": "America/Rio_Branco",
  "Eastern Time - Toronto": "America/Toronto",
  "Easter Island": "Pacific/Easter",
  Caracas: "America/Caracas",
  Asuncion: "America/Asuncion",
  Barbados: "America/Barbados",
  "Boa Vista": "America/Boa_Vista",
  "Campo Grande": "America/Campo_Grande",
  Cuiaba: "America/Cuiaba",
  Curacao: "America/Curacao",
  "Grand Turk": "America/Grand_Turk",
  Guyana: "America/Guyana",
  "Atlantic Time - Halifax": "America/Halifax",
  "La Paz": "America/La_Paz",
  Manaus: "America/Manaus",
  Martinique: "America/Martinique",
  "Port of Spain": "America/Port_of_Spain",
  "Porto Velho": "America/Porto_Velho",
  "Puerto Rico": "America/Puerto_Rico",
  "Santo Domingo": "America/Santo_Domingo",
  Thule: "America/Thule",
  Bermuda: "Atlantic/Bermuda",
  "Newfoundland Time - St. Johns": "America/St_Johns",
  Araguaina: "America/Araguaina",
  "Buenos Aires": "America/Argentina/Buenos_Aires",
  Salvador: "America/Bahia",
  Belem: "America/Belem",
  Cayenne: "America/Cayenne",
  Fortaleza: "America/Fortaleza",
  Godthab: "America/Godthab",
  Maceio: "America/Maceio",
  Miquelon: "America/Miquelon",
  Montevideo: "America/Montevideo",
  Paramaribo: "America/Paramaribo",
  Recife: "America/Recife",
  Santiago: "America/Santiago",
  "Sao Paulo": "America/Sao_Paulo",
  Palmer: "Antarctica/Palmer",
  Rothera: "Antarctica/Rothera",
  Stanley: "Atlantic/Stanley",
  Noronha: "America/Noronha",
  "South Georgia": "Atlantic/South_Georgia",
  Scoresbysund: "America/Scoresbysund",
  Azores: "Atlantic/Azores",
  "Cape Verde": "Atlantic/Cape_Verde",
  Abidjan: "Africa/Abidjan",
  Accra: "Africa/Accra",
  Bissau: "Africa/Bissau",
  Casablanca: "Africa/Casablanca",
  "El Aaiun": "Africa/El_Aaiun",
  Monrovia: "Africa/Monrovia",
  Danmarkshavn: "America/Danmarkshavn",
  "Canary Islands": "Atlantic/Canary",
  Faeroe: "Atlantic/Faroe",
  Reykjavik: "Atlantic/Reykjavik",
  "GMT (no daylight saving)": "Etc/GMT",
  Dublin: "Europe/Dublin",
  Lisbon: "Europe/Lisbon",
  London: "Europe/London",
  Algiers: "Africa/Algiers",
  Ceuta: "Africa/Ceuta",
  Lagos: "Africa/Lagos",
  Ndjamena: "Africa/Ndjamena",
  Tunis: "Africa/Tunis",
  Windhoek: "Africa/Windhoek",
  Amsterdam: "Europe/Amsterdam",
  Andorra: "Europe/Andorra",
  "Central European Time - Belgrade": "Europe/Belgrade",
  Berlin: "Europe/Berlin",
  Brussels: "Europe/Brussels",
  Budapest: "Europe/Budapest",
  Copenhagen: "Europe/Copenhagen",
  Gibraltar: "Europe/Gibraltar",
  Luxembourg: "Europe/Luxembourg",
  Madrid: "Europe/Madrid",
  Malta: "Europe/Malta",
  Monaco: "Europe/Monaco",
  Oslo: "Europe/Oslo",
  Paris: "Europe/Paris",
  "Central European Time - Prague": "Europe/Prague",
  Rome: "Europe/Rome",
  Stockholm: "Europe/Stockholm",
  Tirane: "Europe/Tirane",
  Vienna: "Europe/Vienna",
  Warsaw: "Europe/Warsaw",
  Zurich: "Europe/Zurich",
  Cairo: "Africa/Cairo",
  Johannesburg: "Africa/Johannesburg",
  Maputo: "Africa/Maputo",
  Tripoli: "Africa/Tripoli",
  Amman: "Asia/Amman",
  Beirut: "Asia/Beirut",
  Damascus: "Asia/Damascus",
  Gaza: "Asia/Gaza",
  Jerusalem: "Asia/Jerusalem",
  Nicosia: "Asia/Nicosia",
  Athens: "Europe/Athens",
  Bucharest: "Europe/Bucharest",
  Chisinau: "Europe/Chisinau",
  Helsinki: "Europe/Helsinki",
  Istanbul: "Europe/Istanbul",
  "Moscow-01 - Kaliningrad": "Europe/Kaliningrad",
  Kiev: "Europe/Kiev",
  Riga: "Europe/Riga",
  Sofia: "Europe/Sofia",
  Tallinn: "Europe/Tallinn",
  Vilnius: "Europe/Vilnius",
  Khartoum: "Africa/Khartoum",
  Nairobi: "Africa/Nairobi",
  Syowa: "Antarctica/Syowa",
  Baghdad: "Asia/Baghdad",
  Qatar: "Asia/Qatar",
  Riyadh: "Asia/Riyadh",
  Minsk: "Europe/Minsk",
  "Moscow+00 - Moscow": "Europe/Moscow",
  Tehran: "Asia/Tehran",
  Baku: "Asia/Baku",
  Dubai: "Asia/Dubai",
  Tbilisi: "Asia/Tbilisi",
  Yerevan: "Asia/Yerevan",
  "Moscow+01 - Samara": "Europe/Samara",
  Mahe: "Indian/Mahe",
  Mauritius: "Indian/Mauritius",
  Reunion: "Indian/Reunion",
  Kabul: "Asia/Kabul",
  Mawson: "Antarctica/Mawson",
  Aqtau: "Asia/Aqtau",
  Aqtobe: "Asia/Aqtobe",
  Ashgabat: "Asia/Ashgabat",
  Dushanbe: "Asia/Dushanbe",
  Karachi: "Asia/Karachi",
  Tashkent: "Asia/Tashkent",
  "Moscow+02 - Yekaterinburg": "Asia/Yekaterinburg",
  Kerguelen: "Indian/Kerguelen",
  Maldives: "Indian/Maldives",
  "India Standard Time": "Asia/Calcutta",
  Colombo: "Asia/Colombo",
  Katmandu: "Asia/Katmandu",
  Vostok: "Antarctica/Vostok",
  Almaty: "Asia/Almaty",
  Bishkek: "Asia/Bishkek",
  Dhaka: "Asia/Dhaka",
  "Moscow+03 - Omsk, Novosibirsk": "Asia/Omsk",
  Thimphu: "Asia/Thimphu",
  Chagos: "Indian/Chagos",
  Rangoon: "Asia/Rangoon",
  Cocos: "Indian/Cocos",
  Davis: "Antarctica/Davis",
  Bangkok: "Asia/Bangkok",
  Hovd: "Asia/Hovd",
  Jakarta: "Asia/Jakarta",
  "Moscow+04 - Krasnoyarsk": "Asia/Krasnoyarsk",
  Hanoi: "Asia/Saigon",
  Christmas: "Indian/Christmas",
  Casey: "Antarctica/Casey",
  Brunei: "Asia/Brunei",
  Choibalsan: "Asia/Choibalsan",
  "Hong Kong": "Asia/Hong_Kong",
  "Moscow+05 - Irkutsk": "Asia/Irkutsk",
  "Kuala Lumpur": "Asia/Kuala_Lumpur",
  Macau: "Asia/Macau",
  Makassar: "Asia/Makassar",
  Manila: "Asia/Manila",
  "China Time - Beijing": "Asia/Shanghai",
  Singapore: "Asia/Singapore",
  Taipei: "Asia/Taipei",
  Ulaanbaatar: "Asia/Ulaanbaatar",
  "Western Time - Perth": "Australia/Perth",
  Pyongyang: "Asia/Pyongyang",
  Dili: "Asia/Dili",
  Jayapura: "Asia/Jayapura",
  Seoul: "Asia/Seoul",
  Tokyo: "Asia/Tokyo",
  "Moscow+06 - Yakutsk": "Asia/Yakutsk",
  Palau: "Pacific/Palau",
  "Central Time - Adelaide": "Australia/Adelaide",
  "Central Time - Darwin": "Australia/Darwin",
  "Moscow+07 - Magadan": "Asia/Magadan",
  "Moscow+07 - Yuzhno-Sakhalinsk": "Asia/Vladivostok",
  "Eastern Time - Brisbane": "Australia/Brisbane",
  "Eastern Time - Hobart": "Australia/Hobart",
  "Eastern Time - Melbourne, Sydney": "Australia/Sydney",
  Truk: "Pacific/Chuuk",
  Guam: "Pacific/Guam",
  "Port Moresby": "Pacific/Port_Moresby",
  Efate: "Pacific/Efate",
  Guadalcanal: "Pacific/Guadalcanal",
  Kosrae: "Pacific/Kosrae",
  Norfolk: "Pacific/Norfolk",
  Noumea: "Pacific/Noumea",
  Ponape: "Pacific/Pohnpei",
  "Moscow+09 - Petropavlovsk-Kamchatskiy": "Asia/Kamchatka",
  Auckland: "Pacific/Auckland",
  Fiji: "Pacific/Fiji",
  Funafuti: "Pacific/Funafuti",
  Kwajalein: "Pacific/Kwajalein",
  Majuro: "Pacific/Majuro",
  Nauru: "Pacific/Nauru",
  Tarawa: "Pacific/Tarawa",
  Wake: "Pacific/Wake",
  Wallis: "Pacific/Wallis",
  Apia: "Pacific/Apia",
  Enderbury: "Pacific/Enderbury",
  Fakaofo: "Pacific/Fakaofo",
  Tongatapu: "Pacific/Tongatapu",
  Kiritimati: "Pacific/Kiritimati",
};

const inverseTimezones = Object.entries(timezones).reduce(
  (acc, entry) => ({ ...acc, [entry[1]]: entry[0] }),
  {}
);

const now = new Date();

const nowInUtc = Date.UTC(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  now.getMinutes(),
  0
);

function formatOffset(offset) {
  let hours = parseInt(Math.abs(offset / 60), 10);
  let mins = Math.abs(offset % 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (mins < 10) {
    mins = `0${mins}`;
  }

  if (offset < 0) {
    return `+${hours}:${mins}`;
  }

  return `-${hours}:${mins}`;
}

const timezonesWithOffsets = Object.entries(timezones)
  .map(([label, value]) => {
    const offset = getTimezoneOffset(value, nowInUtc);
    return [`(GMT${formatOffset(offset)}) ${label}`, value];
  })
  .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});

export const formatTimezone = (value) => {
  const label = inverseTimezones[value];
  const offset = getTimezoneOffset(value, nowInUtc);
  return `(GMT${formatOffset(offset)}) ${label}`;
};

export default timezonesWithOffsets;
