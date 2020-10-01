import {
  post as postRequest,
  get as getRequest,
  put as putRequest,
  destroy as destroyRequest,
} from "../utils/request";
import config from "../config";

function siteDomain() {
  return (
    localStorage.getItem("domain") ||
    window.location.host.replace(/:[0-9]+$/, "")
  );
}

const wrapRequest = (fn) => {
  return (path, ...args) => {
    const lastArg = args.length >= 1 && args[args.length - 1];
    const sessionId = lastArg && lastArg.sessionId;
    const requestArgs = sessionId ? args.slice(0, -1) : args;
    const jwtToken = sessionStorage.getItem("token");

    const options = {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "X-Site-Domain": siteDomain(),
        "Content-Type": "application/json",
        Accept: "application/vnd.api+json",
        "X-Api-Version": "1",
      },
    };

    if (sessionId) {
      options.headers["X-Session-Id"] = sessionId;
    }

    const baseUrl = config.apiBaseUrl || "http://localhost:3000";

    return fn(baseUrl + path, ...requestArgs, options);
  };
};

export const post = wrapRequest(postRequest);
export const get = wrapRequest(getRequest);
export const put = wrapRequest(putRequest);
export const destroy = wrapRequest(destroyRequest);

export function fetchCurrentUser() {
  return get("/current-user");
}

export function updateCurrentUser({ payload }) {
  return put("/current-user", payload);
}

export function loginRequest(payload) {
  return post("/request-login", payload);
}

export function signupRequest(payload) {
  return post("/signup", payload);
}

export function createSession(payload) {
  return post("/create-session", payload);
}

export function fetchSession() {
  return get("/current-session");
}

export function destroySession() {
  return destroy("/logout");
}

export function getButton(id) {
  return get(`/buttons/${id}`);
}

export function getButtons() {
  return get("/buttons");
}

export function updateButton(id, data) {
  return put(`/buttons/${id}`, { data });
}

export function destroyButton(id) {
  return destroy(`/buttons/${id}`);
}

export function createButton(data) {
  return post("/buttons", { data });
}
