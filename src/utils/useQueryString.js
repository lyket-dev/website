import { useState, useEffect } from "react";
import querystring from "qs";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const getCurrentQuery = (location) =>
  querystring.parse(location.search, { ignoreQueryPrefix: true });

export default () => {
  const [query, setInternalState] = useState(getCurrentQuery(history.location));

  useEffect(() => {
    return history.listen((location) => {
      setInternalState(getCurrentQuery(location));
    });
  }, []);

  const setQuery = (newQuery) => {
    const currentQuery = getCurrentQuery(history.location);
    history.push(
      `/cda-explorer/?${querystring.stringify({
        ...currentQuery,
        ...newQuery,
      })}`
    );
  };

  return [query, setQuery];
};
