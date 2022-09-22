import Connect from "components/Connect";
import PropTypes from "prop-types";
import qs from "qs";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withLocationQuery from "utils/withLocationQuery";
import pickBy from "lodash-es/pickBy";

export default function withPagination({
  initialResultsPerPage = 50,
  augmentRequest = (x) => x,
  fetchPage,
  getResultsForPageRequest,
  embedded: forceEmbedded,
}) {
  return (WrappedComponent) => {
    @connect((reduxState) => ({ reduxState }))
    @withRouter
    @withLocationQuery
    class WithPagination extends React.Component {
      static propTypes = {
        embedded: PropTypes.bool,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        reduxState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
      };

      state = {
        locationQuery: {},
      };

      componentDidMount() {
        this.fetch();
      }

      componentDidUpdate() {
        this.fetch();
      }

      getLocationQuery() {
        const { locationQuery: stateLocationQuery } = this.state;
        const { embedded, location } = this.props;

        return forceEmbedded || embedded ? stateLocationQuery : location.query;
      }

      setLocationQuery(locationQuery) {
        const { embedded, history, location } = this.props;

        if (forceEmbedded || embedded) {
          this.setState({ locationQuery });
        } else {
          const search = qs.stringify(locationQuery);

          if (location.search !== (search && `?${search}`)) {
            history.push({
              pathname: location.pathname,
              search,
            });
          }
        }
      }

      handleSetCurrentPage(page) {
        const locationQuery = this.getLocationQuery();

        this.setLocationQuery({
          ...locationQuery,
          page: page === 0 ? undefined : page,
        });
      }

      handleSetResultsPerPage(perPage) {
        const locationQuery = this.getLocationQuery();

        this.setLocationQuery({
          ...locationQuery,
          perPage: perPage === initialResultsPerPage ? undefined : perPage,
        });
      }

      handleSetOrdering(orderBy) {
        const locationQuery = this.getLocationQuery();

        this.setLocationQuery({
          ...locationQuery,
          orderBy: orderBy || undefined,
          page: undefined,
        });
      }

      handleSetFilter(filter) {
        const locationQuery = this.getLocationQuery();

        this.setLocationQuery({
          ...locationQuery,
          filter:
            filter && Object.keys(filter).length > 0
              ? pickBy(filter, (x) => x)
              : undefined,
          page: undefined,
        });
      }

      extractFilterFromLocationQuery() {
        const query = this.getLocationQuery();

        if (query && query.filter) {
          return query.filter;
        }

        return {};
      }

      extractCurrentPageFromLocationQuery() {
        const query = this.getLocationQuery();

        if (query && query.page) {
          return parseInt(query.page, 10);
        }

        return 0;
      }

      extractResultsPerPageFromLocationQuery() {
        const query = this.getLocationQuery();

        if (query && query.perPage) {
          return parseInt(query.perPage, 10);
        }

        return initialResultsPerPage;
      }

      extractOrderingFromLocationQuery() {
        const query = this.getLocationQuery();
        return query && query.orderBy;
      }

      async fetch() {
        try {
          const { dispatch } = this.props;
          return await dispatch(fetchPage(this.fetchRequest()));
        } catch (e) {
          this.setState(() => {
            throw e;
          });
          return false;
        }
      }

      fetchRequest() {
        const { reduxState } = this.props;

        const filter = this.extractFilterFromLocationQuery();
        const currentPage = this.extractCurrentPageFromLocationQuery();
        const resultsPerPage = this.extractResultsPerPageFromLocationQuery();
        const ordering = this.extractOrderingFromLocationQuery();

        return augmentRequest(
          {
            query: {
              filter,
              page: {
                limit: resultsPerPage,
                offset: currentPage * resultsPerPage,
              },
              order_by: ordering || undefined,
            },
          },
          reduxState,
          this.props
        );
      }

      render() {
        const filter = this.extractFilterFromLocationQuery();
        const currentPage = this.extractCurrentPageFromLocationQuery();
        const resultsPerPage = this.extractResultsPerPageFromLocationQuery();
        const ordering = this.extractOrderingFromLocationQuery();

        return (
          <Connect
            fetchRequest={this.fetchRequest()}
            mapStateToProps={(state, props) => {
              const { fetchRequest } = props;

              const { items, isFetching, isStale, totalEntries } =
                getResultsForPageRequest(state, fetchRequest);

              return {
                results: {
                  items,
                  isFetching,
                  isStale,
                  totalEntries,
                },
              };
            }}
          >
            {({ results }) => (
              <WrappedComponent
                {...this.props}
                currentPage={currentPage}
                setCurrentPage={this.handleSetCurrentPage.bind(this)}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={this.handleSetResultsPerPage.bind(this)}
                filter={filter}
                setFilter={this.handleSetFilter.bind(this)}
                ordering={ordering}
                setOrdering={this.handleSetOrdering.bind(this)}
                fetch={this.fetch.bind(this)}
                {...results}
              />
            )}
          </Connect>
        );
      }
    }

    return WithPagination;
  };
}
