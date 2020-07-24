import React, { useEffect } from 'react';
import { watchItemIds } from 'pusher/subscribers/item';

export default function withItemsSubscriptions(mapPropsToItemIds) {
  return WrappedComponent => {
    return props => {
      const itemIdsToWatch = mapPropsToItemIds(props);

      useEffect(() => {
        return watchItemIds(itemIdsToWatch);
      }, [JSON.stringify(itemIdsToWatch)]);

      return <WrappedComponent {...props} />;
    };
  };
}
