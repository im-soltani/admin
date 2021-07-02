import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProfileMain from "./components/ProfileMain";
import ProfilInfosTop from "./components/ProfilInfosTop";

import ProfilCompetences from "./components/ProfilCompetences";
import ProfileTabs from "./components/ProfileTabs";
import GraphQlResult from "../../../shared/components/GraphQLResult";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import EditIcon from "mdi-react/EditIcon";
import { withRouter } from "react-router";
import {GET_OFFER_BY_NUM} from "../../../handler/queries"
class OfferDetails extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    getOfferByNum: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    refetch: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    getOfferByNum: null
  };
  render() {
    const { loading, error, getOfferByNum, refetch } = this.props;
    return (
      <Container>
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getOfferByNum}
        >
          {getOfferByNum && (
            <div className="profile" style={{ paddingTop: 30 }}>
              <Row>
                  <span className="profile-div">
                    {getOfferByNum.name}
                    <span className="profile-div2">
                      {"n°" + getOfferByNum.num}
                    </span>
                  </span>
              </Row>
              <Row>
                <Col md={12} lg={5} xl={4}>
                  <Row>
                    <ProfileMain
                      entreprise={getOfferByNum.entreprise}
                      num={getOfferByNum.num}
                    />
                    <ProfilInfosTop offer={getOfferByNum} />{" "}
                    <ProfilCompetences
                      competences={getOfferByNum.competences}
                    />
                    <ProfilCompetences title={"Metiers"} competences={getOfferByNum.jobs} />
                  </Row>
                </Col>
                <ProfileTabs offer={getOfferByNum} refetch={refetch} />
              </Row>
              <div className="Button-add__div" title="Modifier">
                <Link
                  className="Button-add__btn"
                  to={`/modifier-formation/${getOfferByNum.num}`}
                >
                  <EditIcon className="Button-add__btn-icon" />
                </Link>
              </div>
            </div>
          )}
        </GraphQlResult>
      </Container>
    );
  }
}

export default withRouter(
  graphql(GET_OFFER_BY_NUM, {
    options: props => ({
      variables: { num: props.match.params.num},
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, error, getOfferByNum, refetch } }) => ({
      loading,
      error,
      getOfferByNum,
      refetch
    })
  })(OfferDetails)
);
