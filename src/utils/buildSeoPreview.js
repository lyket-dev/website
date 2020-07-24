import { getFieldsForItemType } from 'utils/storeQueries';
import joinUrl from 'url-join';

function getTitleField(state, itemType) {
  const fields = getFieldsForItemType(state, itemType);

  if (itemType.relationships.title_field.data) {
    const { id } = itemType.relationships.title_field.data;

    return fields.find(f => f.id === id);
  }

  return null;
}

function getImageFields(state, itemType) {
  return getFieldsForItemType(state, itemType).filter(field =>
    ['gallery', 'file'].includes(field.attributes.field_type),
  );
}

function getSlugField(state, itemType) {
  return getFieldsForItemType(state, itemType).find(
    field => field.attributes.field_type === 'slug',
  );
}

function getNonEmptyValues(values, fields, locale) {
  return fields
    .filter(x => !!x)
    .map(f =>
      f.attributes.localized
        ? values[f.attributes.api_key] && values[f.attributes.api_key][locale]
        : values[f.attributes.api_key],
    )
    .filter(x => !!x);
}

function getFirstNonEmptyValue(values, fields, locale) {
  const firstNonEmptyValue = getNonEmptyValues(values, fields, locale)[0];

  if (!firstNonEmptyValue) {
    return undefined;
  }

  return firstNonEmptyValue.constructor === Array
    ? firstNonEmptyValue[0]
    : firstNonEmptyValue;
}

function buildUrl({ reduxState, itemTypeId, itemValues, locale }) {
  const itemType = reduxState.itemTypes[itemTypeId];
  const slugField = getSlugField(reduxState, itemType);
  const slugValue = getFirstNonEmptyValue(itemValues, [slugField], locale);
  const envs = Object.values(reduxState.buildTriggers);

  let urlPrefix =
    slugField && slugField.attributes.appearance.parameters.url_prefix;

  if (!urlPrefix) {
    const frontendUrl = envs
      .map(env => env.attributes.frontend_url)
      .find(x => !!x);
    if (frontendUrl) {
      urlPrefix = joinUrl(frontendUrl, '/.../');
    }
  }

  if (!urlPrefix) {
    urlPrefix = 'http://www.mywebsite.com/.../';
  }

  return joinUrl(urlPrefix, slugValue || '');
}

function buildTitle({
  seoFieldValue,
  reduxState,
  itemTypeId,
  itemValues,
  locale,
}) {
  const { locales } = reduxState.site.attributes;
  const itemType = reduxState.itemTypes[itemTypeId];
  const titleField = getTitleField(reduxState, itemType);
  const globalSeo =
    locales.length > 1
      ? reduxState.site.attributes.global_seo[locale]
      : reduxState.site.attributes.global_seo;
  const fallbackSeo = globalSeo && globalSeo.fallback_seo;

  const globalTitle = fallbackSeo && fallbackSeo.title;
  const fallbackTitle = getFirstNonEmptyValue(itemValues, [titleField], locale);
  const seoTitle = seoFieldValue && seoFieldValue.title;

  return seoTitle || fallbackTitle || globalTitle;
}

function buildDescription({ seoFieldValue, reduxState, locale }) {
  const { locales } = reduxState.site.attributes;
  const globalSeo =
    locales.length > 1
      ? reduxState.site.attributes.global_seo[locale]
      : reduxState.site.attributes.global_seo;
  const fallbackSeo = globalSeo && globalSeo.fallback_seo;

  const globalDescription = fallbackSeo && fallbackSeo.description;
  const seoDescription = seoFieldValue && seoFieldValue.description;

  return seoDescription || globalDescription || 'No description available';
}

function buildTwitterCard({ seoFieldValue, reduxState, locale }) {
  const { locales } = reduxState.site.attributes;
  const globalSeo =
    locales.length > 1
      ? reduxState.site.attributes.global_seo[locale]
      : reduxState.site.attributes.global_seo;
  const fallbackSeo = globalSeo && globalSeo.fallback_seo;

  const globalTwitterCard = fallbackSeo && fallbackSeo.twitter_card;
  const seoTwitterCard = seoFieldValue && seoFieldValue.twitter_card;

  return seoTwitterCard || globalTwitterCard || 'summary';
}

function buildTitleWithSuffix(options) {
  const { reduxState, locale } = options;
  const { locales } = reduxState.site.attributes;

  const globalSeo =
    locales.length > 1
      ? reduxState.site.attributes.global_seo[locale]
      : reduxState.site.attributes.global_seo;

  const titleSuffix = globalSeo && globalSeo.title_suffix;
  const title = buildTitle(options);

  const titleWithSuffix =
    titleSuffix && (titleSuffix + title).length <= 60
      ? title + titleSuffix
      : title;

  return titleWithSuffix;
}

function buildImageId({
  seoFieldValue,
  reduxState,
  itemTypeId,
  itemValues,
  locale,
}) {
  const { locales } = reduxState.site.attributes;
  const itemType = reduxState.itemTypes[itemTypeId];
  const imageFields = getImageFields(reduxState, itemType);
  const globalSeo =
    locales.length > 1
      ? reduxState.site.attributes.global_seo[locale]
      : reduxState.site.attributes.global_seo;
  const fallbackSeo = globalSeo && globalSeo.fallback_seo;
  const faviconId = reduxState.site.attributes.favicon;

  const globalImageId = fallbackSeo && fallbackSeo.image;

  const fallbackImage = getNonEmptyValues(itemValues, imageFields, locale)
    .map(x => (x.constructor === Array ? x : [x]))
    .flat()
    .map(id => reduxState.uploads[id])
    .filter(x => !!x)
    .filter(
      upload =>
        upload.attributes.width >= 200 && upload.attributes.height >= 200,
    )[0];

  const fallbackImageId = fallbackImage && fallbackImage.id;

  const seoImageId = seoFieldValue && seoFieldValue.image;

  return seoImageId || fallbackImageId || globalImageId || faviconId;
}

export default function buildSeoPreview(options) {
  const title = buildTitle(options);
  const titleWithSuffix = buildTitleWithSuffix(options);
  const url = buildUrl(options);
  const description = buildDescription(options);
  const imageId = buildImageId(options);
  const twitterCard = buildTwitterCard(options);

  return {
    url,
    title,
    titleWithSuffix,
    description,
    twitterCard,
    imageId,
  };
}
