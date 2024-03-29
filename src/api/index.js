import {
  post as postRequest,
  get as getRequest,
  put as putRequest,
  destroy as destroyRequest,
} from 'utils/request';
import config from 'config';

function siteDomain() {
  return (
    localStorage.getItem('domain') ||
    window.location.host.replace(/:[0-9]+$/, '')
  );
}

const wrapRequest = (fn) => {
  return (path, ...args) => {
    const lastArg = args.length >= 1 && args[args.length - 1];
    const sessionId = lastArg?.sessionId;
    const requestArgs = sessionId ? args.slice(0, -1) : args;

    const options = {
      credentials: 'include',
      headers: {
        'X-Site-Domain': siteDomain(),
        'Content-Type': 'application/json',
        Accept: 'application/vnd.api+json',
        'X-Api-Version': '1',
      },
    };

    if (sessionId) {
      options.headers['X-Session-Id'] = sessionId;
    }

    const baseUrl = config.apiBaseUrl;

    return fn(baseUrl + path, ...requestArgs, options);
  };
};

export const post = wrapRequest(postRequest);
export const get = wrapRequest(getRequest);
export const put = wrapRequest(putRequest);
export const destroy = wrapRequest(destroyRequest);

export function fetchCurrentUser() {
  return get('/current-user');
}

export function updateCurrentUser(payload) {
  return put('/current-user', payload);
}

export function loginRequest(payload) {
  return post('/request-login', payload);
}

export function signupRequest(payload) {
  return post('/sign-up', payload);
}

export function createSession(payload) {
  return post('/create-session', payload);
}

export function fetchSession() {
  return get('/current-session');
}

export function destroySession() {
  return destroy('/logout');
}

export function getButton(id) {
  return get(`/buttons/${id}`);
}

export function getButtonsMeta() {
  return get('/buttons/meta');
}

export function getButtonsTotal() {
  return get('/buttons/total');
}

export function getButtons() {
  return get('/buttons/all');
}

export function getLikeButtons(query) {
  const searchParams = new URLSearchParams(query);
  return get(`/buttons/all-like-buttons?${searchParams.toString()}`);
}

export function getClapButtons(query) {
  const searchParams = new URLSearchParams(query);
  return get(`/buttons/all-clap-buttons?${searchParams.toString()}`);
}

export function getUpdownButtons(query) {
  const searchParams = new URLSearchParams(query);
  return get(`/buttons/all-updown-buttons?${searchParams.toString()}`);
}

export function getRateButtons(query) {
  const searchParams = new URLSearchParams(query);
  return get(`/buttons/all-rate-buttons?${searchParams.toString()}`);
}

export function updateButton(id, data) {
  return put(`/buttons/${id}`, { data });
}

export function destroyButton(id) {
  return destroy(`/buttons/${id}`);
}

export function resetButton(id) {
  return put(`/buttons/${id}/reset`, { data: {} });
}

export function createButton(data) {
  return post('/buttons', { data });
}

export function bulkUploadButtons(data) {
  return post('/buttons/bulk-import', { data });
}

export function tagButton(id, data) {
  return put(`/buttons/${id}/tag`, data);
}
