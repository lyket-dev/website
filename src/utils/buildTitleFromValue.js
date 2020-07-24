import striptags from 'striptags';
import ellipsize from 'ellipsize';
import removeMarkdown from 'remove-markdown';

export default function buildTitleFromValue(value, field, length = 200) {
  if (!field) {
    return value;
  }

  if (field.attributes.field_type === 'text') {
    const { appearance } = field.attributes;

    if (appearance.editor === 'wysiwyg') {
      return ellipsize(striptags(value), length);
    }
    if (appearance.editor === 'markdown') {
      return ellipsize(removeMarkdown(value), length);
    }

    return ellipsize(value, length);
  }

  if (field.attributes.field_type === 'video') {
    return value && value.title;
  }

  return value;
}
