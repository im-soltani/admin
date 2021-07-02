import React from "react";
import { Container, Row } from "reactstrap";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import StatisticsCard from "./components/StatisticsCard";
import OffersByWeek from "./components/OffersByWeek";
import CreateCandidat from "./components/CreateCandidat";
import OffresList from "./components/OffresList";
import OffersFaitesByWeek from "./components/OffersFaitesByWeek";
import {
  GET_USERS_STATS,
  GET_OFFERS_ACTIVE_STATS,
} from "../../handler/queries";
class DefaultDashboard extends React.PureComponent {
  static propTypes = {
    getUsersSatat: PropTypes.array,
    getOffersActiveStatEnterprise: PropTypes.number,
  };

  static defaultProps = {
    getUsersSatat: [0, 0],
    getOffersActiveStatEnterprise: 0,
  };
  render() {
    const { getUsersSatat, getOffersActiveStatEnterprise } = this.props;

    return (
      <Container className="dashboard">
        <Row>
          <StatisticsCard
            icon="selected-cv"
            value={getUsersSatat[0]}
            label="candidats inscrits"
            iconContainerClassName="border-primary"
            iconClassName="fill-primary"
            valueClassName="text-primary"
          />
          <StatisticsCard
            icon="offer"
            value={getOffersActiveStatEnterprise}
            label="offres actives"
            iconContainerClassName="border-danger"
            iconClassName="fill-danger"
            valueClassName="text-danger"
          />
          <StatisticsCard
            icon="eye"
            value={getUsersSatat[1]}
            label="adhérents inscrits"
            iconContainerClassName="border-warning"
            iconClassName="fill-warning"
            valueClassName="text-warning"
          />
          <CreateCandidat />
        </Row>
        <Row>
          <OffresList />
        </Row>
        <Row>
          <OffersByWeek />
          <OffersFaitesByWeek />
        </Row>
      </Container>
    );
  }
}

export default compose(
  graphql(GET_USERS_STATS, {
    options: () => ({
      fetchPolicy: "cache-and-network",
    }),
    props: ({ data: { getUsersSatat } }) => ({
      getUsersSatat,
    }),
  }),
  graphql(GET_OFFERS_ACTIVE_STATS, {
    options: () => ({
      fetchPolicy: "cache-and-network",
    }),
    props: ({ data: { getOffersActiveStatEnterprise } }) => ({
      getOffersActiveStatEnterprise,
    }),
  })
)(DefaultDashboard);
