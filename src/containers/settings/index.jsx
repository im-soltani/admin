import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import { Col, Container, Row } from "reactstrap";
import GraphQlResult from "../../shared/components/GraphQLResult";
import LeftCard from "../../shared/components/LeftCard";
import CandidatsActions from "./components/CandidatsActions";
//import ListeEmails from "./components/ListeEmails";
import EditorView from "./components/EditorView";
import EntreprisesActions from "./components/EntreprisesActions";
import OffersActions from "./components/OffersActions";

class Settings extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    refetch: PropTypes.func,
    error: PropTypes.object,
    getSettings: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    error: null,
    getSettings: {},
  };
  state = { view: 2 };

  handleChange = (value) => this.setState({ view: value });
  render() {
    const { loading, error, getSettings, refetch } = this.props;
    const { view } = this.state;
    return (
      <Container className="dashboard">
        <GraphQlResult
          error={error}
          loading={loading}
          emptyResult={!loading && !getSettings}>
          <Row>
            <Col
              xs={12}
              md={12}
              lg={12}
              xl={3}
              style={{ marginBottom: "2rem" }}>
              <LeftCard handleChange={this.handleChange} />
            </Col>
            {/* view === 1 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                {getEmails && <ListeEmails emails={getEmails} />}
              </Col>
            ) :  */ view ===
            2 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <OffersActions />
              </Col>
            ) : view === 3 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <EntreprisesActions />
              </Col>
            ) : view === 4 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <CandidatsActions />
              </Col>
            ) : view === 5 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <EditorView
                  variable={"rgpd"}
                  refetch={refetch}
                  items={getSettings}
                />
              </Col>
            ) : view === 6 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <EditorView
                  variable={"cgu"}
                  refetch={refetch}
                  items={getSettings}
                />
              </Col>
            ) : view === 7 ? (
              <Col xs={12} md={12} lg={12} xl={9}>
                <EditorView
                  variable={"legal"}
                  refetch={refetch}
                  items={getSettings}
                />
              </Col>
            ) : (
              <Col xs={12} md={12} lg={12} xl={9}>
                <EditorView
                  variable={"tutoriel"}
                  refetch={refetch}
                  items={getSettings}
                />
              </Col>
            )}
          </Row>
        </GraphQlResult>
      </Container>
    );
  }
}
/* const GET_EMAILS = gql`
  query getEmails {
    getEmails {
      id
      name
      template
      subject
    }
  }
`;

export default graphql(GET_EMAILS, {
  options: () => ({
    fetchPolicy: "cache-and-network"
  }),
  props: ({ data: { loading, error, getEmails, refetch } }) => ({
    loading,
    error,
    getEmails,
    refetch
  })
})(Settings); */
const GET_SETTINGS = gql`
  query getSettings {
    getSettings {
      rgpd
      legal
      tutoriel
      cgu
    }
  }
`;

export default graphql(GET_SETTINGS, {
  options: () => ({
    fetchPolicy: "cache-and-network",
  }),
  props: ({ data: { loading, error, getSettings, refetch } }) => ({
    loading,
    error,
    getSettings,
    refetch,
  }),
})(Settings);
