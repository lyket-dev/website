import unique from "array-unique";

function chunk(originalArray, size) {
  const chunked = [];
  const array = [].concat(originalArray);

  while (array.length > 0) {
    chunked.push(array.splice(0, size));
  }

  return chunked;
}

const MAX_IDS = 100;
const WAIT = 500;

export default function debouncedFetchById(fetchById, toFetch) {
  let timestamp = Date.now();
  let ids = [];

  function later(dispatch, getState) {
    const last = Date.now() - timestamp;

    if (last < WAIT && last >= 0) {
      setTimeout(() => later(dispatch, getState), WAIT - last);
    } else if (ids.length > 0) {
      const state = getState();
      const idsToFetch = unique((ids || []).filter((id) => toFetch(state, id)));

      chunk(idsToFetch, MAX_IDS).forEach((idsChunk) => {
        dispatch(fetchById({ ids: idsChunk }));
      });

      ids = [];
    }
  }

  return ({ ids: newIds }) =>
    (...args) => {
      ids = ids.concat(newIds);
      timestamp = Date.now();
      setTimeout(() => later(...args), WAIT);
    };
}
