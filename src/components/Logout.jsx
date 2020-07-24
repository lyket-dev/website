import React from "react";
import useAsyncEffect from "../utils/useAsyncEffect";
import { useHistory } from "react-router-dom";
import { destroySession } from "../api";

export default function Logout() {
  const history = useHistory();

  useAsyncEffect(async () => {
    try {
      const destroyed = await destroySession();

      if (destroyed) {
        sessionStorage.removeItem("token");
      } else {
        throw "could not logout";
      }

      history.push("/");
    } catch (error) {
      console.log(error);
      history.push("/");
    }
  }, []);

  return null;
}
