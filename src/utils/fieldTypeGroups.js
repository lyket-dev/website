import boolean from 'icons/custom/fieldgroup-boolean.svg';
import color from 'icons/custom/fieldgroup-color.svg';
import datetime from 'icons/custom/fieldgroup-datetime.svg';
import json from 'icons/custom/fieldgroup-json.svg';
import location from 'icons/custom/fieldgroup-location.svg';
import media from 'icons/custom/fieldgroup-media.svg';
import number from 'icons/custom/fieldgroup-number.svg';
import reference from 'icons/custom/fieldgroup-reference.svg';
import richText from 'icons/custom/fieldgroup-rich_text.svg';
import seo from 'icons/custom/fieldgroup-seo.svg';
import text from 'icons/custom/fieldgroup-text.svg';

export default [
  {
    name: 'text',
    types: ['string', 'text'],
  },
  {
    name: 'rich_text',
    types: ['rich_text'],
  },
  {
    name: 'media',
    types: ['file', 'gallery', 'video'],
  },
  {
    name: 'datetime',
    types: ['date', 'date_time'],
  },
  {
    name: 'number',
    types: ['integer', 'float'],
  },
  {
    name: 'boolean',
    types: ['boolean'],
  },
  {
    name: 'location',
    types: ['lat_lon'],
  },
  {
    name: 'color',
    types: ['color'],
  },
  {
    name: 'seo',
    types: ['slug', 'seo'],
  },
  {
    name: 'reference',
    types: ['link', 'links'],
  },
  {
    name: 'json',
    types: ['json'],
  },
];

export const groupIcons = {
  boolean,
  color,
  datetime,
  json,
  location,
  media,
  number,
  reference,
  rich_text: richText,
  seo,
  text,
};
