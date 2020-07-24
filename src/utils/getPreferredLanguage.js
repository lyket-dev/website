export default function getPreferredLanguage() {
  const customLocale = localStorage.getItem('forceLocale');

  if (customLocale) {
    return customLocale;
  }

  const code = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;

  if (!code) {
    return 'en';
  }

  return code.split(/[-_]/)[0];
}
