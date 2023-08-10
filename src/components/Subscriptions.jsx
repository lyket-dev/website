import React from 'react';
import { Page, Section } from './Page';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncEffect from 'utils/useAsyncEffect';
import { fetch as fetchCurrentUser } from 'ducks/currentUser';
import UsageChart from './UsageChart';

const availablePlans = {
  free: {
    name: 'Free',
    description: 'Up to 500 pageviews',
    price: 'Free',
    threshold: 500,
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
    threshold: 5000,
  },
  business_plan_v1_monthly: {
    name: 'Business (monthly)',
    description: 'Up to 50k pageviews',
    price: '€10/month',
    stripeCode: 'fZedUI6PMbZn60o5km',
    active: true,
    threshold: 50000,
  },
  business_plan_v1_yearly: {
    name: 'Business (yearly)',
    description: 'Up to 50k pageviews',
    price: '€100/year',
    stripeCode: '00g5ocfmi8Nb2OccMM',
    active: true,
    threshold: 50000,
  },
};

export default function Subscriptions() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.currentUser;
  });

  useAsyncEffect(async () => {
    if (!currentUser) {
      await dispatch(fetchCurrentUser());
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <></>;
  }

  const { subscription: currentSubscription, email } = currentUser.attributes;

  const isSubscribedTo = (s) => s === currentSubscription;

  const renderActivePlans = (plan) => {
    return (
      <li className="ternary__item" key={plan.name}>
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
          {Object.values(availablePlans)
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

  if (!currentUser) {
    return <></>;
  }

  return (
    <Page>
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
          <div className="card__text">
            <span className="menu__item__info">
              <li className="ternary__item outline">
                <p className="ternary__title">
                  {availablePlans[currentSubscription]?.name ||
                    currentSubscription}
                </p>
                {availablePlans[currentSubscription] && (
                  <>
                    <p className="ternary__text">
                      {availablePlans[currentSubscription].description}
                    </p>
                    <p className="ternary__text">
                      {availablePlans[currentSubscription].price}
                    </p>
                  </>
                )}
              </li>
            </span>
          </div>
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
      <Section>
        <div className="window space__bottom-6">
          <div className="window__label">Pageviews</div>
          <UsageChart
            name="Pageviews"
            metrics={['pageviews']}
            unit="pageviews"
            data={currentUser.attributes.pageviews}
            threshold={availablePlans[currentSubscription]?.threshold}
          />
        </div>
      </Section>
    </Page>
  );
}
