import { createReducer, createAction } from 'redux-act';
import debouncedFetchById from 'utils/debouncedFetchById';
import omit from 'object.omit';
import { rawSwitchEnvironment, destroy as logout } from 'ducks/session';

export default function createCollectionReducer({
  name,
  entityStoreLeaf,
  rawFetchPage,
}) {
  function generateCollectionKey({ query = {}, ...other }) {
    return JSON.stringify({ ...other, query: omit(query, ['page']) });
  }

  function generatePageKey({ query = {} }) {
    return JSON.stringify(query.page || {});
  }

  function getResultsForPageRequest(state, request) {
    const collectionData = state[name][generateCollectionKey(request)];

    if (!collectionData) {
      return {
        items: [],
        totalEntries: 0,
        isStale: true,
        isFetching: false,
      };
    }

    const { totalEntries } = collectionData;
    const pageData = collectionData.pages[generatePageKey(request)];

    if (!pageData) {
      return {
        items: [],
        totalEntries,
        isStale: true,
        isFetching: false,
      };
    }

    return {
      items: pageData.ids.map(id => state[entityStoreLeaf][id]).filter(x => x),
      isStale: pageData.isStale,
      totalEntries,
      isFetching: pageData.isFetching,
    };
  }

  const invalidate = createAction(`${name}/invalidate`);

  const fetchPage = request => (dispatch, getState) => {
    const { isFetching, isStale } = getResultsForPageRequest(
      getState(),
      request,
    );

    if (isFetching) {
      return Promise.resolve();
    }

    if (!isStale) {
      return Promise.resolve();
    }

    return dispatch(rawFetchPage(request));
  };

  const nonDebouncedFetchById = ({ ids }) => (dispatch, getState) => {
    const state = getState();
    const idsToFetch = (ids || [])
      .filter(id => !state[entityStoreLeaf][id])
      .filter(x => x);

    if (idsToFetch.length === 0) {
      return Promise.resolve();
    }

    const request = {
      query: { 'filter[ids]': idsToFetch.join(','), 'page[limit]': 500 },
    };
    const key = generatePageKey(request);
    const data = state[name][key];

    if (data) {
      return Promise.resolve();
    }

    return dispatch(rawFetchPage(request));
  };

  const fetchById = debouncedFetchById(
    nonDebouncedFetchById,
    (state, id) => !state[entityStoreLeaf][id],
  );

  const pageReducer = createReducer(
    {
      [rawFetchPage.request]: state => {
        return { ...state, isFetching: true, isFailed: false };
      },
      [rawFetchPage.receive]: (state, { response }) => {
        const { data } = response;

        return {
          ...state,
          isFetching: false,
          isStale: false,
          ids: data.map(r => r.id),
        };
      },
      [invalidate]: state => {
        return { ...state, isStale: true };
      },
      [rawFetchPage.fail]: state => {
        return { ...state, isFetching: true, isFailed: true };
      },
    },
    {
      isStale: null,
      isFetching: false,
      ids: [],
      totalEntries: null,
      isFailed: false,
    },
  );

  const initialCollectionState = {
    totalEntries: null,
    pages: {},
  };

  function collectionReducer(state = initialCollectionState, action) {
    switch (action.type) {
      case rawFetchPage.request.toString():
      case rawFetchPage.fail.toString(): {
        const key = generatePageKey(action.payload);
        return {
          ...state,
          pages: {
            ...state.pages,
            [key]: pageReducer(state.pages[key], action),
          },
        };
      }
      case rawFetchPage.receive.toString(): {
        const key = generatePageKey(action.payload);
        const totalEntries =
          action.payload.response.meta &&
          action.payload.response.meta.total_count;
        return {
          totalEntries,
          pages: {
            ...state.pages,
            [key]: pageReducer(state.pages[key], action),
          },
        };
      }
      case invalidate.toString(): {
        return action.payload && action.payload.resetToInitialState
          ? initialCollectionState
          : {
              ...state,
              pages: Object.keys(state.pages).reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: pageReducer(state.pages[key], action),
                }),
                state.pages,
              ),
            };
      }
      default:
        return state;
    }
  }

  function reducer(state = {}, action) {
    switch (action.type) {
      case rawFetchPage.request.toString():
      case rawFetchPage.receive.toString():
      case rawFetchPage.fail.toString(): {
        const key = generateCollectionKey(
          omit(action.payload, ['response', 'error']),
        );
        return { ...state, [key]: collectionReducer(state[key], action) };
      }
      case invalidate.toString(): {
        const selector =
          (action.payload && action.payload.selector) || (() => true);

        return Object.keys(state).reduce(
          (acc, key) => ({
            ...acc,
            [key]: selector(JSON.parse(key))
              ? collectionReducer(state[key], action)
              : state[key],
          }),
          state,
        );
      }
      case logout.toString():
      case rawSwitchEnvironment.toString(): {
        return {};
      }
      default:
        return state;
    }
  }

  return {
    reducer,
    fetchById,
    fetchPage,
    invalidate,
    getResultsForPageRequest,
  };
}
