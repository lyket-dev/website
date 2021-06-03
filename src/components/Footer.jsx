import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Twitter } from "assets/icons/twitter.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <ul className="footer__list">
          <p className="footer__text">Copyright Lyket 2020</p>•
          <li className="footer__item">
            <Link className="footer__link" to="/privacy">
              Privacy Policy
            </Link>
          </li>
          •
          <li className="footer__link">
            <a
              href="https://twitter.com/LyketDev"
              target="_blank"
              className="footer__link"
              rel="noopener noreferrer"
            >
              <Twitter className="footer__icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
