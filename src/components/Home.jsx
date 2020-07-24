import React from "react";
import Decorator from "./sub/Decorator";

export default function Home() {
  return (
    <>
      <section className="header">
        <div className="flag">
          <div className="">
            <h2 className="header__title">
              <Decorator
                fulltext="Get fresh feedback from your visitors"
                toDecorate="fresh"
                image="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
              />
            </h2>
          </div>
          <div className="">
            <p className="header__subtitle">
              Hungry for some feedback for your website? Implement a social-like
              feature in just a few seconds!
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
          <video
            style={{ width: "600px", height: "300px" }}
            autoPlay
            playsinline=""
            loop=""
            width="960"
            height="600"
            src="https://prod-notion-assets.s3-us-west-2.amazonaws.com/front/shared/benefits/desktop/company-home.mp4"
            type="video/mp4"
          ></video>

          <p className="section__title">Everybody clap now!</p>
          <h2 className="section__title"> 👏 </h2>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <p className="section__title">Let your users bla bla</p>
          <div className="flag">
            <div className="flag__left">
              <p className="flag__title">
                Got some brand new content on your blog and wandering if readers
                are liking it?
              </p>
              <p className="flag__text">
                You don't have to take your content to Medium to see if it is
                reaching to someone. Likit is the ultimate tool for your readers
                leave a token of appreciation and for you to see how you whole
                website is perceived!
              </p>
            </div>
            <div className="flag__image__container">
              <img
                className="flag__image"
                src="https://www.notion.so/front/shared/illustrations/use-case-objects/design.png"
              />
            </div>
          </div>
          <div className="flag">
            <div className="flag__image__container">
              <img
                className="flag__image"
                src="https://www.notion.so/front/shared/illustrations/use-case-objects/marketing.png"
              />
            </div>
            <div className="flag__right">
              <p className="flag__title">
                Your documentation has taken your team weeks to complete but you
                don’t know if your users are really appreciating it?
              </p>
              <p className="flag__text">
                Likit provides the fastest way in the market to allow visitors
                to leave an immediate feedback _appreciation_
              </p>
            </div>
          </div>
          <div className="flag">
            <div className="flag__left">
              You portfolio could use some lovin’ from your audience instagram
              style? Likit lets you implement a love-sharing system for your
              website. _love_
            </div>
            <div className="flag__image__container">
              <img
                className="flag__image"
                src="https://www.notion.so/front/shared/illustrations/use-case-wiki.png"
              />
            </div>
          </div>
        </div>
      </section>
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
                Rapidly integrate Likit in your website just by providing your
                API key and an ID. The API will then take count of your
                day-by-day reactions The React component provides the most used
                feedback templates in the web and makes the calls for you and if
                you don’t like those, you can style it as you prefer!
              </p>
            </div>
            <div className="ternary__item">
              <img
                className="ternary__image"
                src="https://www.notion.so/front/shared/illustrations/use-case-objects/engineering.png"
              />
              <p className="ternary__text">
                RapidAPI is the new cutting-edge technology for building a solid
                micro-service structure and it provides security for your API
                calls and payment
              </p>
            </div>
            <div className="ternary__item">
              <img
                className="ternary__image"
                src="https://www.notion.so/front/shared/illustrations/use-case-objects/product.png"
              />
              <p className="ternary__text">
                We save your data in total compliance with the GDPR regulation,
                and we provide all the statistics you need to make decisions
                about your website’s content.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section--black">
        <div className="section__container">
          <div className="flag">
            <img
              className="section__image"
              src="https://www.notion.so/front/shared/illustrations/use-case-objects/sales.png"
            />
            <div>
              <p className="section__title">
                “Figma is fast. Files are always up to date. It’s easy to share
                designs across the organization, so collaboration is easy.”
              </p>
              <p className="section__subtitle">
                Bryan Haggerty, Sr. Design Manager at Twitter
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">Pricing</h2>
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
      <section className="section">
        <div className="section__container">
          <h2 className="section__title">Give it a try</h2>
          <form action="/action_page.php" method="get" className="search">
            <input type="text" name="email" />
            <input type="submit" />
          </form>
        </div>
      </section>
    </>
  );
}
