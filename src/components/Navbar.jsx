import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { destroySession } from 'ducks/session';
import { notice, alert } from 'utils/notifications';

export default function Navbar({ loggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDestroySession = useCallback(async () => {
    try {
      await dispatch(destroySession());
      notice({ message: 'You have successfully logged out!' });
      navigate('/');
    } catch (e) {
      alert({ message: 'Could not log out :(' });
    }
  }, [dispatch, navigate]);

  const renderLoggedMenuItems = () => {
    return loggedIn ? (
      <>
        <li className="navbar__item">
          <Link className="navbar__link" to="/user-settings">
            Settings
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/subscription">
            Subscription
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="navbar__item">
          <button onClick={handleDestroySession} className="button">
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
    <div className="navbar">
      <div>
        <Link className="navbar__logo" to="/">
          <div className="navbar__logo--mobile"></div>
          <div className="navbar__logo--desk">LYKET</div>
        </Link>
      </div>
      <ul className="navbar__container">{renderLoggedMenuItems()}</ul>
    </div>
  );
}
