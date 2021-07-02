import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Container } from "reactstrap";
import GraphQlResult from "../../shared/components/GraphQLResult";
import { withRouter } from "react-router";
import EmailForm from "./components/EmailForm";

class EmailDetail extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    getEmail: PropTypes.object,
    refetch: PropTypes.func
  };

  static defaultProps = {
    loading: false,
    error: null,
    getEmail: {}
  };
  render() {
    const { loading, error, getEmail, refetch } = this.props;

    return (
      <Container className="dashboard">
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getEmail}
        >
          {getEmail && (
            <div className="Email">
              <EmailForm email={getEmail} refetch={refetch} />
            </div>
          )}
        </GraphQlResult>
      </Container>
    );
  }
}
const GET_EMAIL = gql`
  query getEmail($id: ID!) {
    getEmail(id: $id) {
      id
      name
      subject
      template
    }
  }
`;

export default withRouter(
  graphql(GET_EMAIL, {
    options: props => ({
      variables: { id: props.match.params.id },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, error, getEmail, refetch } }) => ({
      loading,
      error,
      getEmail,
      refetch
    })
  })(EmailDetail)
);
