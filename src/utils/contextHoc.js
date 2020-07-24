import React from 'react';

export const withContextConsumer = (Context, propName) => Component => {
  const ConnectedComponent = props => (
    <Context.Consumer>
      {context => {
        return <Component {...props} {...{ [propName]: context }} />;
      }}
    </Context.Consumer>
  );

  const componentName = Component.displayName || Component.name || 'Component';
  ConnectedComponent.displayName = `withContextConsumer(${componentName})`;

  return ConnectedComponent;
};

export const withContextProvider = (
  Context,
  mapPropsToContext,
) => Component => {
  const ConnectedComponent = props => (
    <Context.Provider value={mapPropsToContext(props)}>
      <Component {...props} />
    </Context.Provider>
  );

  const componentName = Component.displayName || Component.name || 'Component';
  ConnectedComponent.displayName = `withContextProvider(${componentName})`;

  return ConnectedComponent;
};
