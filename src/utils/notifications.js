import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export function notice({ title, message }) {
  store.addNotification({
    title: title || "Success!",
    message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export function alert({ title, message }) {
  store.addNotification({
    title: title || "Operation failed",
    message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
}
