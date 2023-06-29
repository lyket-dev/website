import React from 'react';
import { Link } from 'react-router-dom';

function humanize(str) {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_-\s]+/g, ' ')
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
}

export default function Header({ namespace, currentType, icons }) {
  return (
    <>
      <h2 className="pane__title">
        {namespace
          ? humanize(`${namespace} ${currentType} buttons`)
          : `All ${currentType} buttons`}
      </h2>
      <div className="type-menu">
        <Link
          to={`/dashboard/like${namespace ? `/${namespace}` : ''}`}
          className="type-menu__link"
        >
          {icons['like']}
          Like Buttons
        </Link>
        <span>|</span>
        <Link
          to={`/dashboard/updown${namespace ? `/${namespace}` : ''}`}
          className="type-menu__link"
        >
          {icons['updown']}
          Like/Dislike Buttons
        </Link>
        <span>|</span>
        <Link
          to={`/dashboard/clap${namespace ? `/${namespace}` : ''}`}
          className="type-menu__link"
        >
          {icons['clap']}
          Clap Buttons
        </Link>
        <span>|</span>
        <Link
          to={`/dashboard/rate${namespace ? `/${namespace}` : ''}`}
          className="type-menu__link"
        >
          {icons['rate']}
          Rate Buttons
        </Link>
      </div>
    </>
  );
}
