import React from "react";
import { Row, Container } from "reactstrap";
import GraphQlResult from "../../shared/components/GraphQLResult";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { GET_ADMIN } from "../../handler/queries";
import { withRouter } from "react-router";
import AdminFormEdit from "./componenets/AdminFormEdit";

class AdminEdit extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    getAdmin: PropTypes.object,
    refetch: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    getAdmin: null
  };
  render() {
    const { error, loading, getAdmin } = this.props;
    return (
      <Container className="dashboard">
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getAdmin}
        >
          <Row>
            <AdminFormEdit admin={getAdmin} />
          </Row>
        </GraphQlResult>
      </Container>
    );
  }
}

export default withRouter(
  graphql(GET_ADMIN, {
    options: props => ({
      variables: {
        num:
          props.match.params && props.match.params.num
            ? props.match.params.num
            : null
      },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, error, getAdmin, refetch } }) => ({
      loading,
      error,
      getAdmin,
      refetch
    })
  })(AdminEdit)
);
