import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Pagination from "react-js-pagination";
import HeaderListesOffers from "./HeaderListesOffers";
import OfferItem from "./OfferItem";
import { GET_ADMIN_OFFERS_BY_STATUS } from "../../../handler/queries";
import { CardBody } from "reactstrap";

class ListeOffers extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    data: PropTypes.object,
    getAdminOffersByState: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    data: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      status: "PUBLISHED",
      sort: "recent",
      activePage: 1,
      search: "",
      direction: 1,
      field: "name"
    };
  }

  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * 2
    });
  };

  getStatus = value => {
    this.setState({ status: value });
  };
  getSort = (field, direction) => {
    this.setState({ field, direction });
  };
  onChangeSearch = value => {
    this.setState({ search: value });
  };

  render() {
    const { activePage, status, search, field, direction } = this.state;

    return (
      <CardBody>
        <HeaderListesOffers
          getSort={this.getSort}
          getStatus={this.getStatus}
          onChangeSearch={this.onChangeSearch}
          status={status}
          field={field}
          direction={direction}
          search={search}
        />
        <Query
          query={GET_ADMIN_OFFERS_BY_STATUS}
          variables={{
            state: status,
            search: search,
            skip: (activePage - 1) * 4,
            limit: 4,
            field,
            direction
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;

            return (
              <Fragment>
                {data.getAdminOffersByState &&
                  data.getAdminOffersByState.offers &&
                  data.getAdminOffersByState.offers.map(offer => {
                    return (
                      <OfferItem
                        key={offer.num}
                        offer={offer}
                        state={status}
                        search={search}
                        skip={(activePage - 1) * 4}
                        limit={4}
                      />
                    );
                  })}
                <div style={{ textAlign: "center" }}>
                  <Pagination
                    prevPageText="Précédente"
                    nextPageText="Suivante"
                    firstPageText="Première"
                    lastPageText="Dernière"
                    activePage={activePage}
                    itemsCountPerPage={4}
                    innerClass={"pagination"}
                    totalItemsCount={
                      data.getAdminOffersByState
                        ? data.getAdminOffersByState.totalCount
                        : 0
                    }
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </Fragment>
            );
          }}
        </Query>
      </CardBody>
    );
  }
}

export default ListeOffers;
