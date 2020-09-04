import React from "react";

export default function Privacy() {
  return (
    <div>
      <section className="page">
        <div className="page__container">
          <h1 className="page__title">Pricing</h1>
          <p className="page__text">
            We want to offer a simple pricing model that grows with your website
            with a free tier that lets you experiment with Lyket and a flat one
            for more professional use.
          </p>
          <div className="ternary">
            <div className="ternary__item">
              <h4 className="ternary__title">FREE</h4>
              <div className="ternary__line--green">—</div>
              <p className="ternary__text">
                up to <strong>1,000</strong> pageviews
              </p>
              <p className="ternary__huge">0$</p>
            </div>
            <div className="ternary__item">
              <h4 className="ternary__title">PRO</h4>
              <div className="ternary__line--pink">—</div>
              <p className="ternary__text">
                up to <strong>50,000</strong> pageviews
              </p>
              <p className="ternary__huge">60$/year</p>
            </div>
            <div className="ternary__item">
              <h4 className="ternary__title">CUSTOM</h4>
              <div className="ternary__line--yellow">—-</div>
              <div className="ternary__text">
                <span className="">
                  up to <strong>∞</strong> - contact{" "}
                  <a href="mailto:write@lyket.dev">us</a>!
                </span>
              </div>
              <p className="ternary__huge">-</p>
            </div>
          </div>
        </div>
      </section>
      <section className="page">
        <div className="page__container">
          <h1 className="page__title">What you get</h1>
          <div className="box">
            <ul className="list">
              <li className="list__item__title">
                Three button types with different behaviours
              </li>
              <li className="list__item__title">Statistics dashboard</li>
              <li className="list__item__title">Support</li>
              <li className="list__item__title">Email notifications</li>
              <li className="list__item__title">Import-export data</li>
              <li className="list__item__title">Privacy compliancy</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
