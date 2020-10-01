import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { destroySession } from "../../ducks/session";

export default function Navbar({ loggedIn }) {
  const dispatch = useDispatch();
  const renderLoggedMenuItems = () => {
    return loggedIn ? (
      <>
        <li className="navbar__item">
          <Link className="navbar__link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/user-settings">
            Settings
          </Link>
        </li>
        <li className="navbar__item">
          <button onClick={() => dispatch(destroySession())} className="button">
            Log out
          </button>
        </li>
      </>
    ) : (
      <>
        <li className="navbar__item">
          <Link className="navbar__link" to="/signup">
            Signup
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/login" className="button">
            Log in
          </Link>
        </li>
      </>
    );
  };

  return (
    <ul className="navbar">
      <li>
        <Link className="navbar__logo" to="/">
          LYKET
        </Link>
      </li>
      <div className="navbar__container">{renderLoggedMenuItems()}</div>
    </ul>
  );
}
