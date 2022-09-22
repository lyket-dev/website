import queryString from "qs";
import store from "store";

// imageishThing can be:
// * upload JSON API
// * video JSON API

function getUrl(imageishThing) {
  if (!imageishThing) {
    return null;
  }

  if (imageishThing.thumbnail_url) {
    return { url: imageishThing.thumbnail_url };
  }

  const payload = imageishThing.attributes || imageishThing;

  if (payload.mux_playback_id) {
    return {
      isMux: true,
      url: `https://image.mux.com/${payload.mux_playback_id}/thumbnail.jpg`,
    };
  }

  const path = payload.path.startsWith("/")
    ? payload.path.slice(1)
    : payload.path;

  return {
    url: `https://${store.getState().site.attributes.imgix_host}/${path}`,
    isImgix: true,
  };
}

const formatsWithTransformations = [
  "gif",
  "jpeg",
  "jpg",
  "png",
  "ai",
  "tif",
  "tiff",
];

export function supportsTransformations(imageishThing) {
  if (!imageishThing) {
    return null;
  }

  const payload = imageishThing.attributes || imageishThing;

  return (
    payload.format &&
    formatsWithTransformations.includes(payload.format.toLowerCase())
  );
}

const imageFormats = ["gif", "jpeg", "jpg", "png", "svg"];

export function isImageFormat(imageishThing) {
  if (!imageishThing) {
    return null;
  }

  const payload = imageishThing.attributes || imageishThing;

  return payload.format && imageFormats.includes(payload.format.toLowerCase());
}

export default function imgixThumbUrl(imageishThing, params) {
  const result = getUrl(imageishThing);

  if (!result) {
    return null;
  }

  const { isImgix, isMux, url } = result;

  if (params && isMux) {
    const muxParams = {};
    if (params.w) {
      muxParams.width = params.w;
    }
    if (params.h) {
      muxParams.height = params.h;
    }
    return `${url}?${queryString.stringify(params)}`;
  }

  if (params && isImgix) {
    return `${url}?${queryString.stringify(params)}`;
  }

  return url;
}
