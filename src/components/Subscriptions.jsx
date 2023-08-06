import React from 'react';
import { Section } from './Page';

const planCodes = {
  free: {
    name: 'Free',
    description: 'Up to 500 pageviews',
    price: 'Free',
  },
  deactivating: {
    name: 'Free',
    description:
      'You reached the free plan limit of 500 pageviews/month, your account will be deactivated by the end of the month',
  },
  warned: {
    name: 'Free',
    description:
      'You reached the free plan limitof 500 pageviews/month, your account will be deactivated by the end of the month',
  },
  deactivated: {
    name: 'Deactivated',
    description:
      'Sorry, your account is currently deactivated. To keep using Lyket please upgrade to one of our paid plans',
  },
  to_delete: {
    name: 'Scheduled for deletion',
    description:
      'Due to one year of inactivity, your account is scheduled for deletion. To keep using Lyket reach out to our support team.',
  },
  basic_plan_v2_yearly: {
    name: 'Basic',
    description: 'Up to 5k pageviews',
    price: '€48/year',
    stripeCode: '3cs9Es0ro3sR60obIJ',
    active: true,
  },
  business_plan_v1_monthly: {
    name: 'Business (monthly)',
    description: 'Up to 50k pageviews',
    price: '€10/month',
    stripeCode: 'fZedUI6PMbZn60o5km',
    active: true,
  },
  business_plan_v1_yearly: {
    name: 'Business (yearly)',
    description: 'Up to 50k pageviews',
    price: '€100/year',
    stripeCode: '00g5ocfmi8Nb2OccMM',
    active: true,
  },
};

export function Subscriptions({ currentSubscription, email }) {
  const isSubscribedTo = (s) => s === currentSubscription;

  const renderActivePlans = (plan) => {
    return (
      <li className="ternary__item">
        <a
          href={`https://buy.stripe.com/${plan.stripeCode}?prefilled_email=${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`outline ${isSubscribedTo(plan.name) && 'is-active'}`}
        >
          <p className="ternary__title">{plan.name}</p>
          <p className="ternary__text">{plan.description}</p>
          <p className="ternary__text">{plan.price}</p>
          <button className="outline__button">
            {!isSubscribedTo(plan.name) ? 'Subscribe' : 'Current plan'}
          </button>
        </a>
      </li>
    );
  };

  const renderChangePlan = () => {
    return (
      <>
        <p className="window__title">Change plan</p>
        <ul className="ternary">
          {Object.values(planCodes)
            .filter((p) => p.active)
            .map(renderActivePlans)}
        </ul>
        <li className="ternary__item">
          <a
            href={'https://lyket.dev/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className={`outline ${isSubscribedTo('custom') && 'is-active'}`}
          >
            <p className="ternary__title">Custom</p>
            <p className="ternary__text">From 50k pageviews</p>
            <p className="ternary__text">Contact us!</p>
            <button className="outline__button">Subscribe</button>
          </a>
        </li>
      </>
    );
  };

  return (
    <Section>
      <h1 className="section__title">Subscription</h1>
      <div className="window space__bottom-6">
        <div className="window__label">{email}</div>
        <p className="window__title" />
        <p className="card__text">
          Here you can upgrade your subscription. Read more about our pricing
          options,{' '}
          <a
            href="https://lyket.dev/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            on our pricing page
          </a>
        </p>
        <p className="window__title">Your current plan</p>
        <p className="card__text">
          <span className="menu__item__info">
            <li className="ternary__item outline">
              <p className="ternary__title">
                {planCodes[currentSubscription]?.name || currentSubscription}
              </p>
              {planCodes[currentSubscription] && (
                <>
                  <p className="ternary__text">
                    {planCodes[currentSubscription].description}
                  </p>
                  <p className="ternary__text">
                    {planCodes[currentSubscription].price}
                  </p>
                </>
              )}
            </li>
          </span>
        </p>
        {[
          'free',
          'deactivated',
          'deactivating',
          'warned',
          'to_delete',
        ].includes(currentSubscription) ? (
          renderChangePlan()
        ) : (
          <div className="window__title space__bottom-2">
            To change your plan, please{' '}
            <a href={'https://lyket.dev/contact'}>contact our support team</a>
          </div>
        )}
      </div>
    </Section>
  );
}
