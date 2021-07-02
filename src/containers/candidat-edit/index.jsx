import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import GraphQlResult from "../../shared/components/GraphQLResult";
import ProfileForm from "./components/ProfileForm";
import { GET_CANDIDAT_BY_NUM } from "../../handler/queries";

class CandidatDetails extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    error: PropTypes.object,
    getCandidatByNum: PropTypes.object
  };

  static defaultProps = {
    loading: false,
    error: null,
    getCandidatByNum: null
  };

  state = { upodate: false };

  render() {
    const { loading, error, getCandidatByNum, refetch } = this.props;

    return (
      <Row className="dashboard" style={{ margin: 0 }}>
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getCandidatByNum}
        >
          {getCandidatByNum && (
            <ProfileForm
              getCandidatByNum={getCandidatByNum}
              refetch={refetch}
              loading={loading}
            />
          )}
        </GraphQlResult>
      </Row>
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
  })(CandidatDetails)
);
