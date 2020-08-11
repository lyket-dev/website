import React from "react";
import Decorator from "./sub/Decorator";
import Promo from "../assets/likitVideo.mp4";
import { Link } from "react-router-dom";
import { LikeButton, ClapButton, UpdownButton } from "@laikit/react";
import { ReactComponent as ClapIcon } from "../assets/clapping.svg";
import Face from "../assets/karen.jpeg";

export default function Home() {
  return (
    <>
      <section className="header">
        <div className="header__container">
          <div className="half">
            <div className="half__left">
              <h2 className="header__title">
                <Decorator
                  fulltext="Get some fresh feedback from your visitors"
                  toDecorate="fresh feedback"
                  color="blue"
                />
              </h2>
            </div>
            <div className="half__right half__border">
              <p className="header__subtitle">
                Laikit lets you implement a social-like feature in your static
                website in just a few seconds!
              </p>
              <form action="/action_page.php" method="get" className="search">
                <input type="text" name="email" />
                <button type="submit"> Submit </button>
              </form>
              <div className="check">
                <p className="check__text">1 minute setup</p>
                <p className="check__text">Free forever plan</p>
                <p className="check__text">Completely headless</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section--black">
        <div className="section__container">
          <div className="neon">
            <span>APPLAUSE</span>
          </div>
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
          <h2 className="section__title">No brainer</h2>
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
            />
          </p>
          <div className="half">
            <div className="half__left half__border">
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
            <div className="half__line--green">—</div>
          </div>
          <div className="half">
            <div className="half__line--pink">—</div>
            <div className="half__left">
              <p className="half__text">
                Laikit provides the fastest way in the market to allow visitors
                to leave an immediate feedback!
              </p>
              <div className="half__reaction">
                <UpdownButton id="docs" namespace="homepage" theme="reddit" />
              </div>
            </div>
            <div className="half__right half__border">
              <p className="half__title">
                Your documentation has taken your team weeks to complete but you
                don’t know if your users are really appreciating it?
              </p>
            </div>
          </div>
          <div className="half">
            <div className="half__left half__border">
              <p className="half__title">
                Your portfolio could use some Instagram style lovin’?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                Laikit lets you implement a positive reinforcement system for
                your collection!
              </p>
              <div className="half__reaction">
                <LikeButton
                  id="portfolio"
                  namespace="homepage"
                  theme="twitter"
                />
              </div>
            </div>
            <div className="half__line--yellow">—</div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">
            <Decorator
              fulltext="  What makes it different?"
              toDecorate="different"
              color="yellow"
            />
          </h2>
          <div className="ternary">
            <div className="ternary__item">
              <p className="ternary__title">Fastest implementation</p>
              <div className="ternary__line--green">—</div>
              <p className="ternary__text">
                By using our React component you just need to choose a style and
                provide an identifier for your button and you are done!
              </p>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">No bots allowed</p>
              <div className="ternary__line--pink">—</div>
              <p className="ternary__text">
                Laikit is integrated with Google reCAPTCHA v3 to provide
                protection against malitious use, while never interrupting your
                users.
              </p>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">No signup</p>
              <div className="ternary__line--yellow">—</div>
              <p className="ternary__text">
                Most feedback services require visitors to sign up and that
                discourages them to interact. Laikit keeps track of interactions
                without requiring any further steps
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section--black">
        <div className="section__container">
          <div className="flag">
            <div className="flag__image__container">
              <img className="section__portrait" src={Face} alt="Idontexist" />
            </div>
            <div className="flag__right">
              <p className="flag__title">
                “I cannot wait to see Laikit released. The suspance is killing
                me”
              </p>
              <p className="flag__text">Leila, senior dev @Idontexist Agency</p>
            </div>
          </div>
        </div>
      </section>
      {false && (
        <section className="section">
          <div className="section__container">
            <h2 className="section__title">Pricing </h2>
            <p className="section__text">
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
          <h2 className="section__title">
            <Decorator
              fulltext="Interested?"
              toDecorate="Interested?"
              color="blue"
            />
          </h2>
          <p className="section__text">
            Laikit is work in progress and, at the moment, we are only gathering
            feedback. If you like what you see or think you would use Laikit in
            one of your projects or simply you want to follow our progress, why
            not dropping a few lines? Only updates and no spam, of course :D
          </p>
          <form action="/action_page.php" method="get" className="search">
            <input type="text" name="email" />
            <button type="submit"> Submit </button>
          </form>
        </div>
      </section>
    </>
  );
}
