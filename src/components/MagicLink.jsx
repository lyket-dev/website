import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { RingSpinner } from "react-spinners-kit";
import { createSession } from "ducks/session";
import useAsyncEffect from "utils/useAsyncEffect";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MagicLink = () => {
  const token = useQuery().get("token");
  const dispatch = useDispatch();
  const history = useHistory();

  useAsyncEffect(async () => {
    try {
      await dispatch(createSession({ token }));
      history.push("user-settings");
    } catch (e) {
      history.push("login");
      console.error(e);
    }
  }, []);

  return (
    <div className="page">
      <section className="page__section--center">
        <RingSpinner size={100} color="#ff00c3" />
      </section>
    </div>
  );
};

export default MagicLink;
