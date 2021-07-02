import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Pagination from "react-js-pagination";
import HeaderListesOffers from "../../offers/components/HeaderListesOffers";
import OfferItem from "../../offers/components/OfferItem";
import { GET_OFFERS_BY_STATUS_BY_ENTREPRISE } from "../../../handler/queries";
import { CardBody } from "reactstrap";
import { withRouter } from "react-router-dom";

class ListeOffersByEntreprise extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    data: PropTypes.object,
    getOffersByStateByEntreprise: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    data: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      status: "DRAFT",
      field: "name",
      direction: 1,
      activePage: 1,
      search: ""
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
          query={GET_OFFERS_BY_STATUS_BY_ENTREPRISE}
          variables={{
            num: this.props.match.params.num,
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
                {data.getOffersByStateByEntreprise &&
                  data.getOffersByStateByEntreprise.offers &&
                  data.getOffersByStateByEntreprise.offers.map(offer => {
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
                      data.getOffersByStateByEntreprise
                        ? data.getOffersByStateByEntreprise.totalCount
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

export default withRouter(ListeOffersByEntreprise);
