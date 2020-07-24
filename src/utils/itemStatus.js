export default function(item) {
  if (!item) {
    return 'new';
  }

  if (!item.id) {
    return 'new';
  }

  if (!item.meta.status) {
    return 'published';
  }

  return item.meta.status;
}
