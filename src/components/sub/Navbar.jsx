import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ loggedIn }) {
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
          <Link to="/logout" className="button">
            Log out
          </Link>
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
      <li className="navbar__logo">
        <Link to="/">LIKIT</Link>
      </li>
      <div className="navbar__container">
        <li className="navbar__item">
          <Link to="/docs" className="navbar__link">
            Docs
          </Link>
        </li>
        {renderLoggedMenuItems()}
      </div>
    </ul>
  );
}
