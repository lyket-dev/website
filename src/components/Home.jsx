import React, { useState, useRef, useEffect } from "react";
import Decorator from "./sub/Decorator";
import Promo from "../assets/likitVideo.mp4";
import { Link } from "react-router-dom";
import { LikeButton, ClapButton, UpdownButton } from "@lyket/react";
import { ReactComponent as ClapIcon } from "../assets/clapping.svg";
import { ReactComponent as Clap } from "../assets/clap.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import Face from "../assets/karen.jpeg";
import Typist from "react-typist";

export default function Home() {
  const [email, emailSet] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {});

  const handleChange = (e) => {
    emailSet(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
              {false && (
                <a
                  href="https://www.producthunt.com/posts/lyket?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lyket"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: "200px" }}
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=249624&theme=light"
                    alt="Lyket - Engage your audience with fresh out of the box like buttons | Product Hunt Embed"
                    width="250"
                    height="54"
                  />
                </a>
              )}
            </div>
            <div className="half__right half__border">
              <p className="header__subtitle">
                Lyket lets you add a <strong>like/clap/vote button</strong> in
                your static website in just a few seconds!
              </p>
              <div className="check">
                <Clap className="check__icons" />
                <Heart className="check__icons" />
                <Like className="check__icons" />
              </div>
              <form name="login" className="search">
                <input type="hidden" name="form-name" value="contact" />
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="myemail@mail.com"
                  onChange={handleChange}
                />
                <button type="submit" onClick={handleClick}>
                  Receive an API key!
                </button>
              </form>
              <div className="check">
                <p className="check__text">1 minute setup</p>
                <p className="check__text">Free forever plan</p>
                <p className="check__text">Headless</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section--black">
        <div className="section__container">
          <div className="flag">
            <div className="flag__left">
              <Typist className="typist">
                {'import { ClapButton } from "@lyket/react";'}
                <br />
                <br />
                {"<ClapButton"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'namespace="homepage"'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'id="everybody-clap-now"'}
                <br />
                {"/>"}
              </Typist>
            </div>
            <div className="flag__right">
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
                Do you wonder if your readers are liking the latest blog post?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                While comments can lead to useless polemics, a{" "}
                <strong>simple reaction button</strong> can immediately make
                your blog feel a little less aloof!
              </p>
              <div className="half__reaction">
                <ClapButton
                  id="blog"
                  namespace="homepage"
                  theme={ClapButton.themes.Medium}
                />
              </div>
            </div>
            <div className="half__line--green">—</div>
          </div>
          <div className="half">
            <div className="half__line--pink">—</div>
            <div className="half__left">
              <p className="half__text">
                Sometimes you don't need only positive reinforcement. If you are
                providing a service,{" "}
                <strong>critics can be even more crucial</strong>!
              </p>
              <div className="half__reaction">
                <UpdownButton id="docs" namespace="homepage" />
              </div>
            </div>
            <div className="half__right half__border">
              <p className="half__title">
                Your documentation has taken weeks to complete but you don’t
                know if users are appreciating it?
              </p>
            </div>
          </div>
          <div className="half">
            <div className="half__left half__border">
              <p className="half__title">
                Your portfolio could use some lovin'?
              </p>
            </div>
            <div className="half__right">
              <p className="half__text">
                Just like Twitter, Instagram and all social-networks alike are
                tools to <strong>expose your work to the word</strong>, your
                website should <strong>behave in the same way!</strong>
              </p>
              <div className="half__reaction">
                <LikeButton
                  id="portfolio"
                  namespace="homepage"
                  theme={LikeButton.themes.Twitter}
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
              fulltext="No-brainer"
              toDecorate="No-brainer"
              color="yellow"
            />
          </h2>
          <div className="ternary">
            <div className="ternary__item">
              <p className="ternary__title">Register on Lyket >></p>
              <div className="ternary__line--green">—</div>
              <div className="typist--white">
                <div className="typist--animated">Signup</div>
                <Typist
                  cursor={{ show: false }}
                  startDelay={1500}
                  avgTypingDelay={50}
                >
                  {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"YOUR-API-KEY = xxx"}
                  <br />
                  {"}"}
                  <br />
                  <br />
                </Typist>
              </div>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">Configure the provider >></p>
              <div className="ternary__line--pink">—</div>

              <Typist
                className="typist--white"
                startDelay={3500}
                avgTypingDelay={50}
              >
                {'import { Provider } from "@lyket/react";'}
                <br />
                <br />
                {"<Provider apiKey='xxx'/>"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"<App />"}
                <br />
                {"</Provider>"}
              </Typist>
            </div>
            <div className="ternary__item">
              <p className="ternary__title">Choose a button >></p>
              <div className="ternary__line--yellow">—</div>

              <Typist
                className="typist--white"
                startDelay={8000}
                avgTypingDelay={50}
              >
                {'import { LikeButton } from "@lyket/react";'}
                <br />
                <br />
                {"<LikeButton"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'id="my-button"'}
                <br />
                {"/>"}
              </Typist>
            </div>
          </div>
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
            Lyket is in beta stage and we are offering free API keys to try and
            evaluate the service. Request one using this form! And why not
            dropping a few lines? :D
          </p>
          <div ref={myRef}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              className="form"
            >
              <input type="hidden" name="form-name" value="contact" />
              <label>
                <span>*Email:</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  placeholder="myemail@mail.com"
                />
              </label>
              <label>
                <span>*Tech:</span>
                <select type="text" name="tech" required>
                  <option value="">Choose one</option>
                  <option value="react">ReactJS</option>
                  <option value="next">Next.js</option>
                  <option value="gatsby">Gatsby</option>
                  <option value="reactStatic">React Static</option>
                  <option value="other">Other - can you specify?</option>
                  <option value="idk">I don't know :)</option>
                </select>
              </label>
              <label>
                <span>Website: </span>
                <input
                  type="text"
                  name="website"
                  placeholder="https://myawesomewebsite.com"
                />
              </label>
              <label>
                <span>Message:</span> <textarea name="message" />
              </label>
              <button type="submit" className="button">
                {email ? "Give me this key, already! :D" : "Receive an API key"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
