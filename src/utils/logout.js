// import { useHistory } from "react-router-dom";
import { destroySession } from "../api";

export default async function logout() {
  try {
    await destroySession();
  } catch (error) {
    console.error(error);
  }
}
