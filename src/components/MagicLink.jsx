import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { RingSpinner } from "react-spinners-kit";
import { createSession } from "ducks/session";
import useAsyncEffect from "utils/useAsyncEffect";
import { notice, alert } from "utils/notifications";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MagicLink = () => {
  const token = useQuery().get("token");
  const dispatch = useDispatch();
  const history = useHistory();
  const sleep = (m) => new Promise((r) => setTimeout(r, m));

  useAsyncEffect(async () => {
    try {
      await dispatch(createSession({ token }));
      await sleep(1200);
      notice({ message: "You are now logged in!" });
      history.push("user-settings");
    } catch (e) {
      alert({ message: e.errors[0] && e.errors[0].message });
      await sleep(1200);
      history.push("login");
    }
  }, []);

  return (
    <div className="page">
      <RingSpinner size={100} color="#201335" />
    </div>
  );
};

export default MagicLink;
