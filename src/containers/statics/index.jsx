import PropTypes from "prop-types";
import React from "react";
import { compose, graphql } from "react-apollo";
import { Container, Row } from "reactstrap";
import {
  EXPORT_CANDIDATES,
  EXPORT_COMPETENCE,
  EXPORT_ECOLE,
  EXPORT_ENTREPRISES,
  EXPORT_JOBS,
  EXPORT_SOFTSKILL,
  GET_APPLICATION_STATS_BY_ADHERENT_TYPE,
  GET_OFFERS_ACTIVE_STATS,
  GET_USERS_STATS,
  MY_CV_STAT,
} from "../../handler/queries";
import OffersByWeek from "../home/components/OffersByWeek";
import OffersFaitesByWeek from "../home/components/OffersFaitesByWeek";
import ApplicationsByWeek from "./components/ApplicationsByWeek";
import ExportCard from "./components/exportCard";
import SharedCVStat from "./components/SharedCVStat";
import StatisticsCard from "./components/StatisticsCard";
import StatisticsCard2 from "./components/StatisticsCard2";
import UserAgeSexeStats from "./components/UserAgeSexeStats";

class Statics extends React.PureComponent {
  static propTypes = {
    getUsersSatat: PropTypes.array,
    getOffersActiveStatEnterprise: PropTypes.number,
    getMyCVSatat: PropTypes.number,
    getApplicationsByAdherent: PropTypes.array,
    exportCandidates: PropTypes.func,
    exportEntreprises: PropTypes.func,
    exportEcole: PropTypes.func,
    exportCompetence: PropTypes.func,
    exportSoftskill: PropTypes.func,
    exportJobs: PropTypes.func,
  };

  static defaultProps = {
    getUsersSatat: [0, 0],
    getApplicationsByAdherent: [0, 0],
    getOffersActiveStatEnterprise: 0,
    getMyCVSatat: 0,
  };
  render() {
    const {
      getUsersSatat,
      getOffersActiveStatEnterprise,
      getMyCVSatat,
      getApplicationsByAdherent,
    } = this.props;
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
            icon="eye"
            value={getMyCVSatat}
            label="candidats à l'écoute du marché"
            iconContainerClassName="border-warning"
            iconClassName="fill-warning"
            valueClassName="text-warning"
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
        </Row>
        <Row>
          <ExportCard
            exportFunc={this.props.exportCandidates}
            exportFunc2={this.props.exportCompetence}
            exportFunc3={this.props.exportJobs}
            exportFunc4={this.props.exportSoftskill}
            exportFunc5={this.props.exportEntreprises}
            exportFunc6={this.props.exportEcole}
          />
        </Row>
        <Row>
          <StatisticsCard2
            icon="offer"
            value={getApplicationsByAdherent[0]}
            label="candidatures totales pour les offres d'emploi, via BOOSTMYJOB"
            iconContainerClassName="border-danger"
            iconClassName="fill-danger"
            valueClassName="text-danger"
          />
          <StatisticsCard2
            icon="offer"
            value={getApplicationsByAdherent[1]}
            label="candidatures totales pour les offres de formation, via BOOSTMYJOB"
            iconContainerClassName="border-danger"
            iconClassName="fill-danger"
            valueClassName="text-danger"
          />
        </Row>
        <Row>
          <OffersByWeek />
          <OffersFaitesByWeek />
        </Row>
        <Row>
          <ApplicationsByWeek />
        </Row>
        <Row>
          <SharedCVStat />
        </Row>
        <UserAgeSexeStats />
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
  graphql(EXPORT_CANDIDATES, { name: "exportCandidates" }),
  graphql(EXPORT_ENTREPRISES, { name: "exportEntreprises" }),
  graphql(EXPORT_ECOLE, { name: "exportEcole" }),
  graphql(EXPORT_COMPETENCE, { name: "exportCompetence" }),
  graphql(EXPORT_SOFTSKILL, { name: "exportSoftskill" }),
  graphql(EXPORT_JOBS, { name: "exportJobs" }),
  graphql(GET_OFFERS_ACTIVE_STATS, {
    options: () => ({
      fetchPolicy: "cache-and-network",
    }),
    props: ({ data: { getOffersActiveStatEnterprise } }) => ({
      getOffersActiveStatEnterprise,
    }),
  }),
  graphql(GET_APPLICATION_STATS_BY_ADHERENT_TYPE, {
    options: () => ({
      fetchPolicy: "cache-and-network",
    }),
    props: ({ data: { getApplicationsByAdherent, refetch } }) => ({
      getApplicationsByAdherent,
      refetch,
    }),
  }),
  graphql(MY_CV_STAT, {
    options: () => ({
      fetchPolicy: "cache-and-network",
    }),
    props: ({ data: { getMyCVSatat, refetch } }) => ({
      getMyCVSatat,
      refetch,
    }),
  })
)(Statics);
