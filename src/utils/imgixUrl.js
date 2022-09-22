import store from "store";
import queryString from "qs";

export default function imgixUrl(upload, params) {
  const payload = upload.attributes || upload;

  if (payload.size > 500000000) {
    return payload.url;
  }

  const path = payload.path.startsWith("/")
    ? payload.path.slice(1)
    : payload.path;

  const url = `https://${store.getState().site.attributes.imgix_host}/${path}`;

  if (params) {
    return `${url}?${queryString.stringify(params)}`;
  }

  return url;
}
