import wait from "./wait";

const underMaintenanceError = {
  id: "UNDER_MAINTENANCE",
  type: "api_error",
  attributes: {
    code: "UNDER_MAINTENANCE",
    details: {}
  }
};

const rawRequest = async function request(url, options = {}, retryCount = 1) {
  const res = await fetch(url, options);

  if (res.status === 429) {
    if (retryCount >= 10) {
      return null;
    }

    const waitTime = res.headers.get("X-RateLimit-Reset")
      ? parseInt(res.headers.get("X-RateLimit-Reset"), 10)
      : 10;
    await wait(waitTime * retryCount * 1000);
    return request(url, options, retryCount + 1);
  }

  if (res.status === 204) {
    return null;
  }

  const reqResMeta = {
    request: {
      url,
      ...options
    },
    response: {
      status: res.status,
      headers: Object.fromEntries([...res.headers])
    }
  };

  let body;

  try {
    body = await res.json();
  } catch (e) {
    return Promise.reject({ data: [underMaintenanceError], reqResMeta });
  }

  if (res.status >= 200 && res.status < 300) {
    return body;
  }

  body.reqResMeta = reqResMeta;

  throw body;
};

export const request = (url, options = {}) => {
  let error;

  // create the error before the async part
  // otherwise we loose the stack!

  try {
    throw new Error("Failed API call");
  } catch (e) {
    error = e;
  }

  return rawRequest(url, options).catch(e => {
    e.error = error;
    throw e;
  });
};

export const get = function get(url, options = {}) {
  return request(url, options);
};

export const post = function post(url, body, options = {}) {
  return request(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    ...options
  });
};

export const put = function put(url, body, options = {}) {
  return request(url, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
    ...options
  });
};

export const destroy = function destroy(url, options = {}) {
  return request(url, {
    method: "DELETE",
    mode: "cors",
    ...options
  });
};
