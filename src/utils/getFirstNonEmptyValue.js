export default function getFirstNonEmptyValue(item, fields) {
  const { attributes } = item;

  const firstNonEmptyField = fields.find(f => {
    const val = attributes[f.attributes.api_key];
    return Array.isArray(val) ? val.length > 0 : !!val;
  });

  if (fields.length === 0 || !firstNonEmptyField) {
    return undefined;
  }

  let imageValue;

  if (firstNonEmptyField.attributes.localized) {
    imageValue = Object.values(
      attributes[firstNonEmptyField.attributes.api_key],
    ).find(l => !!l);
  } else {
    imageValue = attributes[firstNonEmptyField.attributes.api_key];
  }

  if (!imageValue) {
    return undefined;
  }

  return imageValue.constructor === Array ? imageValue[0] : imageValue;
}
