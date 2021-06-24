import { createAction } from "redux-act";

export default function createAsyncAction(prefix, promiseFactory, cacheHit) {
  const request = createAction(`[${prefix}] REQUEST`);
  const receive = createAction(`[${prefix}] RECEIVE`);
  const fail = createAction(`[${prefix}] FAIL`);

  function asyncActionCreator(...params) {
    return async (dispatch, getState) => {
      try {
        if (cacheHit && !params.force) {
          const hit = cacheHit(params, getState);
          if (hit) {
            return Promise.resolve(hit);
          }
        }

        dispatch(request(...params));

        const response = await promiseFactory(...params);

        dispatch(
          receive({
            response,
            ...params,
          })
        );
        return Promise.resolve(response);
      } catch (error) {
        dispatch(
          fail({
            error,
            ...params,
          })
        );
        throw error;
      }
    };
  }

  asyncActionCreator.request = request;
  asyncActionCreator.receive = receive;
  asyncActionCreator.fail = fail;

  return asyncActionCreator;
}
