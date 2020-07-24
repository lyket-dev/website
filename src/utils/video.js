import queryString from 'qs';
import oembed from 'api/oembed';
import pick from 'object.pick';

function youTubeVideoID(data) {
  return data.html.match(/embed\/([_\-0-9A-Za-z]+)/)[1];
}

function facebookVideoID(url) {
  const splitted = url.split('/');
  const index = splitted.indexOf('videos');
  return splitted[index + 1];
}

export async function fetchVideoMetadata(url) {
  const data = await oembed(url);
  const isVideo = data.type === 'video';
  const providerIsAllowed =
    data.provider_name === 'YouTube' ||
    data.provider_name === 'Vimeo' ||
    data.provider_name === 'Facebook';

  if (!isVideo || !providerIsAllowed) {
    throw new Error('Could not fetch video metadata!');
  }

  let extras = null;

  if (data.provider_name === 'YouTube') {
    extras = {
      provider: 'youtube',
      provider_uid: String(youTubeVideoID(data)),
    };
  } else if (data.provider_name === 'Vimeo') {
    extras = {
      provider: 'vimeo',
      provider_uid: String(data.video_id),
    };
  } else if (data.provider_name === 'Facebook') {
    extras = {
      provider: 'facebook',
      provider_uid: String(facebookVideoID(url)),
      height: data.thumbnail_height,
      width: data.thumbnail_width,
    };
  }

  return {
    ...extras,
    ...pick(data, ['url', 'height', 'width', 'thumbnail_url', 'title']),
  };
}

export function videoIFrameUrl(video, opts = {}) {
  switch (video.provider) {
    case 'youtube': {
      const query = queryString.stringify({
        modestbranding: 1,
        hd: 1,
        fs: 1,
        iv_load_policy: 3,
        autohide: 1,
        controls: 2,
        rel: 0,
        autoplay: 1,
        showinfo: 0,
        ...opts,
      });
      return `https://www.youtube.com/embed/${video.provider_uid}?${query}`;
    }
    case 'vimeo': {
      const query = queryString.stringify({
        api: 1,
        js_api: 1,
        title: 0,
        byline: 0,
        portrait: 0,
        playbar: 0,
        autoplay: 1,
        badge: 0,
        ...opts,
      });
      return `https://player.vimeo.com/video/${video.provider_uid}?${query}`;
    }
    case 'facebook': {
      const query = queryString.stringify({
        href: video.url,
        autoplay: 1,
        allowFullScreen: 0,
        ...opts,
      });
      return `https://www.facebook.com/plugins/video.php?${query}`;
    }
    default:
      throw new Error(`cannot handle ${video.provider} provider!`);
  }
}
