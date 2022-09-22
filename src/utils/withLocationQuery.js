import { withProps } from "recompose";
import qs from "qs";

export default withProps((props) => {
  return {
    location: {
      ...props.location,
      query: qs.parse(props.location.search, { ignoreQueryPrefix: true }),
    },
  };
});
