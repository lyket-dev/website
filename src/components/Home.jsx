import React from "react";
import Decorator from "./sub/Decorator";
import Promo from "../assets/likitVideo.mp4";
import { Link } from "react-router-dom";
import { LikeButton, ClapButton, UpdownButton } from "@lyket/react";
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
                Lyket lets you add a <strong>like button</strong> in your static
                website in just a few seconds. It's still WIP leave us your
                email to be updated!
              </p>
              <form
                name="login"
                method="POST"
                data-netlify="true"
                className="search"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="text" name="email" required />
                <button type="submit">Yes, update me!</button>
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
            {({ counter, pressUp, hasVoted }) => (
              <div className="social">
                <div className="social__container">
                  <button onClick={pressUp} className="social__button">
                    <ClapIcon />
                  </button>
                </div>
                <span className="social__counter">{counter}</span>
              </div>
            )}
          </ClapButton>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">
            <Decorator
              fulltext="No-brainer"
              toDecorate="No-brainer"
              color="yellow"
            />
          </h2>
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
                Lyket is composed by a <strong>simple API</strong> that keeps
                track of reactions and a customizable{" "}
                <strong>React component</strong> with all the most famous social
                button themes. Is the ultimate tool for your visitors to leave a
                token of appreciation and for you to see how your work is
                perceived!
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
              fulltext="Bring your content to life!"
              toDecorate="to life!"
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
                Oftenly you don't have any idea on how readers are{" "}
                <strong>reacting to your posts</strong> and at the same time the
                lack of a feedback system can make your blog feel a little
                aloof. But, while comments can lead to useless polemics, a
                simple Medium-style clap button can immediately spice things up!
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
                Sometimes you don't need only positive reinforcement. On the
                contrary, <strong>critics can be even more crucial</strong> if
                you are providing a service!
              </p>
              <div className="half__reaction">
                <UpdownButton id="docs" namespace="homepage" theme="reddit" />
              </div>
            </div>
            <div className="half__right half__border">
              <p className="half__title">
                Your documentation has taken weeks to complete but you don’t
                know if users are really appreciating it?
              </p>
            </div>
          </div>
          <div className="half">
            <div className="half__left half__border">
              <p className="half__title">
                Your portfolio could use some loving?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                Just like Twitter, Instagram and all social-networks alike are
                tools to expose your work to the word and{" "}
                <strong>receive appreciation</strong>, your website should{" "}
                <strong>behave in the same way!</strong>
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
                provide an identifier for your button and{" "}
                <strong>you are done!</strong>
              </p>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">No bots allowed</p>
              <div className="ternary__line--pink">—</div>
              <p className="ternary__text">
                Lyket is integrated with <strong>Google reCAPTCHA V3</strong> to
                provide protection against malitious use, while never
                interrupting your users.
              </p>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">No signup</p>
              <div className="ternary__line--yellow">—</div>
              <p className="ternary__text">
                Most feedback services require visitors to sign up and that
                discourages interaction. Lyket keeps track of reactions{" "}
                <strong>without any further steps.</strong>
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
                “I cannot wait to see Lyket released. The suspance is killing
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
            Lyket is work in progress and, at the moment, we are only gathering
            feedback. If you like what you see or think you would use Lyket in
            one of your projects or simply you want to follow our progress, why
            not dropping a few lines? Only updates and no spam, of course :D
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label>
              Your Name: <input type="text" name="name" required />
            </label>
            <label>
              Your Email: <input type="email" name="email" required />
            </label>
            <label>
              Your Role: <input type="text" name="name" />
            </label>
            <label>
              Message: <textarea name="message"></textarea>
            </label>
            <button type="submit" className="button">
              Send
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
