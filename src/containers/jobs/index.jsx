import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Input } from "reactstrap";
import Pagination from "react-js-pagination";
import { graphql, compose,Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_JOBS } from "../../handler/queries";
import FlotLabelWithActions from "../../shared/components/FlotLabelWithActions";
import ItemActions from "../../shared/components/ItemActions";

class JobsList extends React.PureComponent {
  static propTypes = {
    getJobs: PropTypes.array,
    addJob: PropTypes.func,
    updateJob: PropTypes.func,
    removeJob: PropTypes.func,
    exportJobs: PropTypes.func
  };

  static defaultProps = {
    getJobs: []
  };

  state = {
    activePage: 1,
    search: "",
    skip: 0,
    limit: 50,
    item: {}
  };

  handlePageChange = pageNumber => {
    this.setState({
      activePage: pageNumber,
      skip: pageNumber * 2
    });
  };

  getItem = (item, update) => this.setState({ item, update });

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { search, limit, activePage, item, update } = this.state;
    return (
      <div className="Items">
        <Row className="Items-row__header">
          <Input
            className="Profil-group__input"
            onChange={this.onChange}
            type="text"
            value={this.state.search}
            name="search"
            placeholder="Rechercher"
          />
        </Row>
        <Query
          query={GET_JOBS}
          variables={{
            search: search,
            skip: (activePage - 1) * limit,
            limit: limit
          }}
        >
          {({ data: { getJobs }, loading, error, refetch }) => {
            if (loading) return <div />;
            else if (error) return <p>ERROR</p>;

            return (
              <Container className="Items-container">
                <Row
                  className="Items-row__content"
                  style={{ marginBottom: 30 }}
                >
                  <Col xl={3} lg={3} md={5} sm={12} className="Items-col__left">
                    <ItemActions
                      item={item}
                      addItems={this.props.addJob}
                      exportFunc={this.props.exportJobs}
                      refetch={refetch}
                      getItem={this.getItem}
                      update={update}
                      updateItem={this.props.updateJob}
                      label={"métier"}
                    />
                  </Col>

                  <Col
                    xl={8}
                    lg={8}
                    md={6}
                    sm={12}
                    className="Items-col__right"
                  >
                    <FlotLabelWithActions
                      items={getJobs.jobs}
                      removeItem={this.props.removeJob}
                      getItem={this.getItem}
                      enableDelete={true}
                      refetch={refetch}
                      label={"métiers"}
                      className="sticky-labes"
                    />
                  </Col>
                </Row>

                <div style={{ textAlign: "center" }}>
                  <Pagination
                    prevPageText="Précédente"
                    nextPageText="Suivante"
                    firstPageText="Première"
                    lastPageText="Dernière"
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    innerClass={"pagination"}
                    totalItemsCount={getJobs ? getJobs.totalCount : 0}
                    pageRangeDisplayed={limit}
                    onChange={this.handlePageChange}
                  />
                </div>
              </Container>
            );
          }}
        </Query>
      </div>
    );
  }
}
const ADD_JOBS = gql`
  mutation addJob($data: [JobInput]) {
    addJob(data: $data) {
      id
      name
    }
  }
`;
const UPDATE_JOB = gql`
  mutation updateJob($id: ID!, $name: String!) {
    updateJob(id: $id, name: $name) {
      id
      name
    }
  }
`;
const REMOVE_JOB = gql`
  mutation removeJob($id: ID!) {
    removeJob(id: $id)
  }
`;
const EXPORT_JOBS = gql`
  mutation exportJobs {
    exportJobs
  }
`;
export default compose(
  graphql(ADD_JOBS, { name: "addJob" }),
  graphql(UPDATE_JOB, { name: "updateJob" }),
  graphql(REMOVE_JOB, { name: "removeJob" }),
  graphql(EXPORT_JOBS, { name: "exportJobs" }),
)(JobsList);
