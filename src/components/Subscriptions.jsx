import React from 'react';
import { Section } from './Page';

const planCodes = {
  free: 'Free - up to 500 pageviews',
  deactivating:
    'Free - you reached the free plan limit of 500 pageviews/month, your account will be deactivated by the end of the month',
  warned:
    'Free - you reached the free plan limitof 500 pageviews/month, your account will be deactivated by the end of the month',
  deactivated:
    'Sorry, your account is currently deactivated. To keep using Lyket please upgrade to one of our paid plans',
  basic_plan_v2_yearly: 'Basic plan yearly',
  business_plan_v1_yearly: 'Business plan yearly',
  business_plan_v1_monthly: 'Business plan monthly',
};

export function Subscriptions({ currentSubscription, email }) {
  const isSubscribedTo = (s) => s === currentSubscription;

  const renderChangePlan = () => {
    return (
      <>
        <p className="window__title">Change plan</p>
        <ul className="ternary">
          <li className="ternary__item">
            <a
              href={`https://buy.stripe.com/3cs9Es0ro3sR60obIJ?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`outline ${
                isSubscribedTo('basic_plan_v2_yearly') && 'is-active'
              }`}
            >
              <p className="ternary__title">Basic</p>
              <p className="ternary__text">5k pageviews</p>
              <p className="ternary__text">€48/year</p>
              <button className="outline__button">
                {!isSubscribedTo('basic_plan_v2_yearly')
                  ? 'Subscribe'
                  : 'Current plan'}
              </button>
            </a>
          </li>
          <li className="ternary__item">
            <a
              href={`https://buy.stripe.com/fZedUI6PMbZn60o5km?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`outline ${
                isSubscribedTo('business_plan_v1_monthly') && 'is-active'
              }`}
            >
              <p className="ternary__title">Business monthly</p>
              <p className="ternary__text">50k pageviews</p>
              <p className="ternary__text">€10/month</p>
              <button className="outline__button">
                {!isSubscribedTo('business_plan_v1_monthly')
                  ? 'Subscribe'
                  : 'Current plan'}
              </button>
            </a>
          </li>
          <li className="ternary__item">
            <a
              href={`https://buy.stripe.com/00g5ocfmi8Nb2OccMM?prefilled_email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`outline ${
                isSubscribedTo('business_plan_v1_yearly') && 'is-active'
              }`}
            >
              <p className="ternary__title">Business yearly</p>
              <p className="ternary__text">50k pageviews</p>
              <p className="ternary__text">€100/year</p>
              <button className="outline__button">
                {!isSubscribedTo('business_plan_v1_yearly')
                  ? 'Subscribe'
                  : 'Current plan'}
              </button>
            </a>
          </li>
        </ul>
      </>
    );
  };

  return (
    <Section>
      <h1 className="section__title">Subscription</h1>
      <div className="window space__bottom-6">
        <div className="window__label">{email}</div>
        <p className="window__title"></p>
        <p className="card__text">
          Here you can upgrade your subscription to get more pageviews. Read
          more about our pricing options,{' '}
          <a
            href="https://lyket.dev/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
        <p className="window__title">Current plan</p>
        <p className="card__text">
          <span className="menu__item__info">
            {planCodes[currentSubscription] || currentSubscription}
          </span>
        </p>
        {['free', 'deactivated', 'deactivating', 'warned'].includes(
          currentSubscription,
        ) ? (
          renderChangePlan()
        ) : (
          <div className="window__title space__bottom-2">
            To change your plan, please contact our support team at{' '}
            <a href="mailto:write@lyket.dev">write@lyket.dev</a>
          </div>
        )}
        <p className="card__text">
          Need more pageviews? Contact{' '}
          <a href="mailto:write@lyket.dev">our support team</a>
        </p>
      </div>
    </Section>
  );
}
