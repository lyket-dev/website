export default function getFieldValue(item, field, locales) {
  if (!field) {
    return undefined;
  }

  if (field.attributes.localized) {
    return (
      item.attributes[field.attributes.api_key] &&
      locales
        .map(locale => item.attributes[field.attributes.api_key][locale])
        .find(value => !!value)
    );
  }

  return item.attributes[field.attributes.api_key];
}
