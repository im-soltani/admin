import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProfileMain from "./components/ProfileMain";
import ProfilInfosTop from "./components/ProfilInfosTop";
import ProfilInfosBottom from "./components/ProfilInfosBottom";
import ProfilCompetences from "./components/ProfilCompetences";
import ProfileTabs from "./components/ProfileTabs";
import GraphQlResult from "../../shared/components/GraphQLResult";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { GET_CANDIDAT_BY_NUM } from "../../handler/queries";
//import { Link } from "react-router-dom";
//import EditIcon from "mdi-react/EditIcon";
import { withRouter } from "react-router";

class CandidatProfil extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    getCandidatByNum: PropTypes.object,
    refetch: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  static defaultProps = {
    loading: false,
    error: null,
    getCandidatByNum: null
  };
  render() {
    const { loading, error, getCandidatByNum, refetch } = this.props;
    return (
      <Container>
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getCandidatByNum}
        >
          {getCandidatByNum && (
            <div className="profile">
              <Row>
                <Col md={12} lg={5} xl={4}>
                  <Row>
                    <ProfileMain
                      profile_pic_url={getCandidatByNum.profile_pic_url}
                      first_name={getCandidatByNum.first_name}
                      last_name={getCandidatByNum.last_name}
                      email={getCandidatByNum.profile.email}
                      createdAt={getCandidatByNum.createdAt}
                      num={getCandidatByNum.num}
                      is_blocked={getCandidatByNum.profile.is_blocked}
                      is_blocked_by_admin={
                        getCandidatByNum.profile.is_blocked_by_admin
                      }
                      id_profile={getCandidatByNum.profile.id}
                      refetch={refetch}
                      id={getCandidatByNum.id}
                    />
                    <ProfilInfosTop candidat={getCandidatByNum} />
                    <ProfilInfosBottom candidat={getCandidatByNum} />
                    <ProfilCompetences
                      competences={getCandidatByNum.competences} test={true}
                    />
                    <ProfilCompetences
                      competences={getCandidatByNum.softskills} test={false}
                    />
                  </Row>
                </Col>
                <ProfileTabs candidat={getCandidatByNum} />
              </Row>
           {/* <div className="Button-add__div" title="Modifier">
                <Link
                  className="Button-add__btn"
                  to={`/modifier-candidat/${getCandidatByNum.num}`}
                >
                  <EditIcon className="Button-add__btn-icon" />
                </Link>
                    </div> */} 
            </div>
          )}
        </GraphQlResult>
      </Container>
    );
  }
}

export default withRouter(
  graphql(GET_CANDIDAT_BY_NUM, {
    options: props => ({
      variables: { num: props.match.params.num },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, error, getCandidatByNum, refetch } }) => ({
      loading,
      error,
      getCandidatByNum,
      refetch
    })
  })(CandidatProfil)
);
