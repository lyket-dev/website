import React from "react";
import Decorator from "./sub/Decorator";
import Promo from "../assets/likitVideo.mp4";
import { Link } from "react-router-dom";
import { LikeButton, ClapButton, UpdownButton } from "@laikit/react";
import { ReactComponent as ClapIcon } from "../assets/clapping.svg";

export default function Home() {
  return (
    <>
      <section className="header">
        <div className="half">
          <div className="half__left">
            <h2 className="header__title">
              <Decorator
                fulltext="Get some fresh feedback from your visitors"
                toDecorate="fresh feedback"
                color="blue"
                image="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
              />
            </h2>
          </div>
          <div className="half__right--border">
            <p className="header__subtitle">
              Laikit lets you implement a social-like feature for your static
              website in just a few seconds!
            </p>
            <form action="/action_page.php" method="get" className="search">
              <input type="text" name="email" />
              <input type="submit" />
            </form>
            <div className="check">
              <p className="check__text">1 minute setup</p>
              <p className="check__text">Free forever plan</p>
              <p className="check__text">Completely headless</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <p className="neon">
            <b>
              <span>APPLAUSE</span>
            </b>
          </p>
          <ClapButton namespace="homepage" id="everybody-clap-now">
            {({ counter, onClick, hasVoted }) => (
              <div className="social">
                <button onClick={onClick} className="social__button">
                  <ClapIcon />
                </button>
                <span className="social__counter">{counter}</span>
              </div>
            )}
          </ClapButton>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <div className="flag">
            <div className="flag__image__container">
              <video
                className="flag__video"
                src={Promo}
                autoPlay
                playsInline
                loop
                type="video/mp4"
              />
            </div>
            <div className="flag__right">
              <p className="flag__text">
                Laikit is composed by a simple API that keeps track of reactions
                and a customizable React component with all the most famous
                social button themes
              </p>
              <Link to="docs" className="section__link">
                Check out our docs {">>"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <p className="section__title">
            <Decorator
              fulltext="Let your users leave a mark"
              toDecorate="leave a mark"
              color="red"
              image="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
            />
          </p>
          <div className="half">
            <div className="half__line" />
            <div className="half__left--border">
              <p className="half__title">
                Got some brand new content on your blog and you are wandering if
                readers are liking it?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                You don't have to post your content to Medium to see if it is
                reaching out to someone. Laikit is the ultimate tool for your
                readers leave a token of appreciation and for you to see how
                your work is perceived!
              </p>
              <div className="half__reaction">
                <ClapButton id="blog" namespace="homepage" theme="medium" />
              </div>
            </div>
          </div>
          <div className="half">
            <div className="half__line" />
            <div className="half__left">
              <p className="half__text">
                Laikit provides the fastest way in the market to allow visitors
                to leave an immediate feedback!
              </p>
              <div className="half__reaction">
                <UpdownButton id="docs" namespace="homepage" theme="reddit" />
              </div>
            </div>
            <div className="half__right--border">
              <p className="half__title">
                Your documentation has taken your team weeks to complete but you
                don’t know if your users are really appreciating it?
              </p>
            </div>
          </div>
          <div className="half">
            <div className="half__line" />
            <div className="half__left--border">
              <p className="half__title">
                Your portfolio could use some Instagram style lovin’?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                Laikit lets you implement a positive reinforcement system for
                your website.
              </p>
              <div className="half__reaction">
                <LikeButton
                  id="portfolio"
                  namespace="homepage"
                  theme="twitter"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {false && (
        <section className="section">
          <div className="section__container">
            <h2 className="section__title">
              How is it so simple? Because we take care of everything for you!
            </h2>
            <div className="ternary">
              <div className="ternary__item">
                <img
                  className="ternary__image"
                  src="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
                />
                <p className="ternary__title">Fastest integration</p>
                <p className="ternary__text">
                  Rapidly integrate Laikit in your website just by providing
                  your API key and an ID. The API will then take count of your
                  day-by-day reactions. The React component provides the most
                  used feedback templates in the web and makes the calls for you
                  and if you don’t like those, you can style it as you prefer!
                </p>
              </div>
              <div className="ternary__item">
                <img
                  className="ternary__image"
                  src="https://www.notion.so/front/shared/illustrations/use-case-objects/engineering.png"
                />
                <p className="ternary__text">
                  RapidAPI is the new cutting-edge technology for building a
                  solid micro-service structure and it provides security for
                  your API calls and payment
                </p>
              </div>
              <div className="ternary__item">
                <img
                  className="ternary__image"
                  src="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
                />
                <p className="ternary__text">
                  We save your data in total compliance with the GDPR
                  regulation, and we provide all the statistics you need to make
                  decisions about your website’s content.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="section--black">
        <div className="section__container">
          <div className="flag">
            <img
              className="section__image"
              src="https://www.notion.so/front/shared/illustrations/use-case-objects/sales.png"
            />
            <div>
              <p className="flag__title">
                “I cannot wait to see Laikit released. The suspance is killing
                me”
              </p>
              <p className="section__subtitle">
                John Johnson, senior dev @ StillWaiting
              </p>
            </div>
          </div>
        </div>
      </section>
      {false && (
        <section className="section">
          <div className="section__container">
            <h2 className="section__title">Pricing </h2>
            <p className="section__subtitle">
              No trial | free forever plan | pay as you grow
            </p>
            <div className="ternary">
              <div className="ternary__item">
                <p className="ternary__title">Free plan</p>
                <p className="ternary__text">0£</p>
              </div>
              <div className="ternary__item">
                <p className="ternary__title">Growth plan</p>
                <p className="ternary__text">0£</p>
              </div>
              <div className="ternary__item">
                <p className="ternary__title">Custom plan</p>
                <p className="ternary__text">0£</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__container">
          <h2 className="section__title">Interested?</h2>
          <p className="section__subtitle">
            Laikit is work in progress and, at the moment, we are only gathering
            feedback. If you like what you see or think you would use Laikit in
            one of your projects or simply you want to follow our progress, why
            not dropping a few lines? Only updates and no spam, of course :D
          </p>
          <form action="/action_page.php" method="get" className="search">
            <input type="text" name="email" />
            <input type="submit" />
          </form>
        </div>
      </section>
    </>
  );
}
