import { createAction } from 'redux-act';

const requestPage = (endpoint, resultKey, page) => ({
  type: 'REQUEST_PAGE',
  payload: {
    page,
  },
  meta: {
    endpoint,
    resultKey,
  },
});

export default function createAsyncAction(endpoint, resultKey) {
  return (page) => requestPage(endpoint, resultKey, page);
}
